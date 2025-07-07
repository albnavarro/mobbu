/**
 * @import {GetRef, MobComponent, ReturnBindProps, UseMethodByName} from '@mobJsType';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { searchOverlayList } from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';
import { searchSuggestionKey } from './suggestion-list';

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlayHeader>} params.getRef
 * @param {import('./type').SearchOverlayHeader['state']} params.proxi
 */
const sendToList = ({ getRef, proxi }) => {
    const { search_input } = getRef();
    const currentSearch = /** @type {HTMLInputElement} */ (search_input).value;

    // send on click submit
    sendSearch({ currentSearch });
    proxi.suggestionListActive = false;
};

/**
 * @param {object} params
 * @param {string} params.currentSearch
 */
const sendSearch = ({ currentSearch }) => {
    console.log('send', currentSearch);

    /**
     * @type {UseMethodByName<import('../list/type').SearchOverlayList>}
     */
    const listMethods = useMethodByName(searchOverlayList);
    listMethods?.update([
        {
            section: 'test section',
            title: 'test title',
            uri: '#test_uri',
        },
    ]);
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
    proxi.suggestionListActive = false;
    proxi.suggestionListData = [];
};

/**
 * @param {object} params
 * @param {string} params.currentSearch
 * @param {import('./type').SearchOverlayHeader['state']} params.proxi
 */
const filterSuggestion = ({ currentSearch, proxi }) => {
    proxi.suggestionListData =
        currentSearch.length < 2
            ? []
            : searchSuggestionKey.filter(({ word }) => {
                  return word
                      .toLowerCase()
                      .includes(currentSearch.toLowerCase());
              });

    proxi.suggestionListActive = true;
};

/** @type {MobComponent<import('./type').SearchOverlayHeader>} */
export const SearchOverlayHeaderFn = ({
    delegateEvents,
    getRef,
    setRef,
    getProxi,
    bindEffect,
    bindProps,
    addMethod,
    onMount,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { search_input, suggestionElement } = getRef();

        /**
         * Update innput value from outside ( suggestion component ) and send
         */
        addMethod('forceInputValue', (value) => {
            search_input.value = value;
            sendSearch({ currentSearch: value });
            proxi.suggestionListActive = false;
        });

        /**
         * Close suggestion from outside ( main component click )
         */
        addMethod('closeSuggestion', (element) => {
            if (
                suggestionElement !== element &&
                !suggestionElement.contains(element)
            )
                proxi.suggestionListActive = false;
        });
    });

    return html`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${setRef('search_input')}
                ${delegateEvents({
                    click: () => {
                        proxi.suggestionListActive = true;
                    },
                    keyup: MobCore.useDebounce(
                        (/** @type {KeyboardEvent} */ event) => {
                            // send on enter press

                            if (event.code.toLowerCase() === 'enter') {
                                event.preventDefault();
                                sendToList({ getRef, proxi });
                                return;
                            }

                            if (event.code.toLowerCase() === 'escape') {
                                event.preventDefault();
                                proxi.suggestionListActive = false;
                                return;
                            }

                            // update suggestion
                            const currentSearch =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value;
                            filterSuggestion({ currentSearch, proxi });
                        },
                        200
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
                keypress: (/** @type {KeyboardEvent} */ event) => {
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
                keypress: (/** @type {KeyboardEvent} */ event) => {
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
