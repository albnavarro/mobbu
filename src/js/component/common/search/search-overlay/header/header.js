/**
 * @import {GetRef, MobComponent, ReturnBindProps, UseMethodByName} from '@mobJsType';
 */

import { getCommonData } from '@data/index';
import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { searchOverlayList } from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

/**
 * @param {object} params
 * @param {string} params.currentSearch
 */
const sendSearch = async ({ currentSearch }) => {
    /**
     * @type {UseMethodByName<import('../list/type').SearchOverlayList>}
     */
    const listMethods = useMethodByName(searchOverlayList);
    listMethods?.update(currentSearch);
};

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlayHeader>} params.getRef
 * @param {import('./type').SearchOverlayHeader['state']} params.proxi
 */
const sendToList = ({ getRef }) => {
    const { search_input } = getRef();
    const currentSearch = /** @type {HTMLInputElement} */ (search_input).value;

    // send on click submit
    sendSearch({ currentSearch });
};

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlayHeader>} params.getRef
 * @param {import('./type').SearchOverlayHeader['state']} params.proxi
 */
const sendReset = ({ getRef, proxi }) => {
    /**
     * @type {UseMethodByName<import('../list/type').SearchOverlayList>}
     */
    const listMethods = useMethodByName(searchOverlayList);
    listMethods?.reset();

    const { search_input } = getRef();
    search_input.value = '';
    proxi.suggestionListData = [];
};

// number should fail system.
const getFakeReplacement = (/** @type {number} */ index) => `~${index}`;

/**
 * @param {object} params
 * @param {string} params.currentSearch
 * @param {import('./type').SearchOverlayHeader['state']} params.proxi
 */
const filterSuggestion = ({ currentSearch, proxi }) => {
    const mainData = getCommonData();
    const searchSuggestionKey = mainData.suggestion;

    if (currentSearch.length === 0) proxi.suggestionListData = [];

    /**
     * `~` char is not allowed ( is getFakeReplacement )
     */
    const stringParsed =
        currentSearch
            .replaceAll('~', '')
            .split(' ')
            .filter((block) => block !== '') ?? '';

    proxi.suggestionListData = (
        searchSuggestionKey.filter(({ word }) => {
            return stringParsed.every((piece) =>
                word.toLowerCase().includes(piece.toLowerCase())
            );
        }) ?? []
    ).map(({ word }) => {
        return {
            word,
            wordHiglight: (() => {
                /**
                 * Avoid to replce string in <span> tag added. Repelce placeholder, and trask order
                 */
                const stringParseWithPlaceholder = stringParsed.reduce(
                    (previous, current, index) => {
                        /**
                         * Exclude string after ~ from substitution ( previuos replace )
                         */
                        return previous
                            .toLowerCase()
                            .replaceAll(
                                new RegExp(
                                    `(?<!~)${current.toLowerCase()}`,
                                    'g'
                                ),
                                `${getFakeReplacement(index)}`
                            );
                    },
                    word
                );

                /**
                 * Replace placeholder with real occurrence in original order.
                 */
                return stringParsed.reduce((previous, current, index) => {
                    return previous.replaceAll(
                        `${getFakeReplacement(index)}`,
                        `<span class="match-string">${current}</span>`
                    );
                }, stringParseWithPlaceholder);
            })(),
        };
    });
};

/** @type {MobComponent<import('./type').SearchOverlayHeader>} */
export const SearchOverlayHeaderFn = ({
    delegateEvents,
    getRef,
    setRef,
    getProxi,
    bindProps,
    addMethod,
    onMount,
    computed,
    bindEffect,
}) => {
    const proxi = getProxi();

    // Close suggestion pop-up when no occorrence found
    computed(
        () => proxi.suggestionListActive,
        () => proxi.suggestionListData.length > 0
    );

    onMount(() => {
        const { search_input, suggestionElement } = getRef();

        /**
         * Update innput value from outside ( suggestion component ) and send
         */
        addMethod('forceInputValue', (value) => {
            search_input.value = value;
            proxi.suggestionListData = [];
            sendSearch({ currentSearch: value });
        });

        /**
         * Close suggestion from outside ( main component click )
         */
        addMethod('shouldCloseSuggestion', (element) => {
            if (
                suggestionElement !== element &&
                !suggestionElement.contains(element)
            )
                proxi.suggestionListData = [];
        });

        /**
         * Close suggestion from outside ( main component click )
         */
        addMethod('closeSuggestion', () => {
            proxi.suggestionListData = [];
        });

        /**
         * Wait animation completed before set focus to input
         */
        addMethod('setInputFocus', async () => {
            search_input.value = '';

            setTimeout(() => {
                search_input.focus();
            }, 300);
        });
    });

    return html`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${setRef('search_input')}
                ${delegateEvents({
                    keyup: MobCore.useDebounce(
                        (/** @type {KeyboardEvent} */ event) => {
                            // send on enter press

                            if (event.code.toLowerCase() === 'enter') {
                                event.preventDefault();
                                sendToList({ getRef, proxi });
                                proxi.suggestionListData = [];
                                return;
                            }

                            if (event.code.toLowerCase() === 'escape') {
                                event.preventDefault();
                                proxi.suggestionListData = [];
                                return;
                            }

                            // update suggestion
                            const currentSearch =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value;
                            filterSuggestion({ currentSearch, proxi });
                        },
                        60
                    ),
                })}
            />
            <div
                class="search-overlay-header__suggestion-container"
                ${setRef('suggestionElement')}
                ${bindEffect({
                    toggleClass: {
                        active: () => proxi.suggestionListActive,
                    },
                })}
            >
                <search-overlay-suggestion
                    ${bindProps(
                        /** @returns {ReturnBindProps<import('./suggestion/type').SearchOverlaySuggestion>} */
                        () => ({
                            list: proxi.suggestionListData,
                        })
                    )}
                ></search-overlay-suggestion>
            </div>
        </div>

        <!-- Submit -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${delegateEvents({
                click: () => {
                    sendToList({ getRef, proxi });
                },
                keydown: (/** @type {KeyboardEvent} */ event) => {
                    if (event.code.toLowerCase() === 'enter') {
                        sendToList({ getRef, proxi });
                    }
                },
            })}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${delegateEvents({
                click: () => {
                    sendReset({ getRef, proxi });
                },
                keydown: (/** @type {KeyboardEvent} */ event) => {
                    if (event.code.toLowerCase() === 'enter') {
                        sendReset({ getRef, proxi });
                    }
                },
            })}
        >
            reset
        </button>
    </div>`;
};
