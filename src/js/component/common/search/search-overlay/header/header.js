import { getCommonData } from '@data/index';
import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { resetOverlayList, updateOverlayList } from '../list/utils';
import { SearchOverlaySuggestion } from './suggestion/definition';

/**
 * @import {
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps
 * } from '@mobJsType'
 * @import {SearchOverlaySuggestionType} from './suggestion/type'
 */

/**
 * @param {object} params
 * @param {string} params.currentSearch
 */
const sendSearch = async ({ currentSearch }) => {
    updateOverlayList(currentSearch);
};

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlayHeader>} params.getRef
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
 * @param {ProxiSelfState<import('./type').SearchOverlayHeader>} params.proxi
 */
const sendReset = ({ getRef, proxi }) => {
    resetOverlayList();

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
     * Use last word of input search for filter suggestion.
     */
    const inputSearchLastWord = currentSearch.split(' ').slice(-1).join('');

    /**
     * `~` char is not allowed ( is getFakeReplacement ). Remove `~` character. stringParsed is an array in case we want
     * to process more than one word. Current logic use only last word so is unnecessary.
     */
    const stringParsed =
        inputSearchLastWord
            .replaceAll('~', '')
            .split(' ')
            .filter((block) => block !== '') ?? '';

    /**
     * Update suggestion list based on last input search word.
     */
    proxi.suggestionListData = (
        searchSuggestionKey.filter(({ word }) => {
            return stringParsed.some((piece) =>
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
                        `<span class="u-match-string">${current}</span>`
                    );
                }, stringParseWithPlaceholder);
            })(),
        };
    });
};

/** @type {MobComponent<import('./type').SearchOverlayHeader>} */
export const SearchOverlayHeaderFunction = ({
    delegateEvents,
    getRef,
    setRef,
    getSelfProxi,
    bindProps,
    addMethod,
    onMount,
    computed,
    bindEffect,
}) => {
    const proxi = getSelfProxi();

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
        addMethod('updateCurrentSearchFromSuggestion', (value) => {
            const currentValue = search_input.value;

            /**
             * Replace last word with suggestion value.
             */
            const currentValueSplitted = currentValue.split(' ');
            const newSearchValue =
                currentValueSplitted.length === 0
                    ? value
                    : (() => {
                          const currentValueLessLast = currentValueSplitted
                              .slice(0, -1)
                              .join(' ');
                          return `${currentValueLessLast} ${value}`;
                      })();
            search_input.value = newSearchValue.trimStart();
            proxi.suggestionListData = [];
            search_input.focus();
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
         * Check if suggestion in active for esc listener conflict.
         */
        addMethod('suggestionIsActive', () => proxi.suggestionListActive);

        /**
         * Wait animation completed before set focus to input
         */
        addMethod('setInputFocus', async () => {
            MobCore.useFrameIndex(() => {
                search_input.focus();
            }, 20);
        });

        /**
         * Close suggestion whwen focus in outside and is not search_input
         */
        const unsubscribeTabHandler = MobCore.useTabHandler(() => {
            MobCore.useNextFrame(() => {
                const activeElement = document.activeElement;

                if (
                    !suggestionElement.contains(activeElement) &&
                    activeElement !== getRef()?.search_input
                ) {
                    proxi.suggestionListData = [];
                }
            });
        });

        return () => {
            unsubscribeTabHandler();
        };
    });

    /**
     * Search button handler.
     */
    const searchModules = [
        setRef('search_input'),
        delegateEvents({
            keyup: MobCore.useDebounce((/** @type {KeyboardEvent} */ event) => {
                if (event?.code?.toLowerCase?.() === 'enter') {
                    event.preventDefault();
                    sendToList({ getRef });
                    proxi.suggestionListData = [];
                    return;
                }

                if (event?.code?.toLowerCase?.() === 'escape') {
                    event.preventDefault();
                    proxi.suggestionListData = [];
                    return;
                }

                // update suggestion
                const currentSearch = /** @type {HTMLInputElement} */ (
                    event.currentTarget
                ).value;

                filterSuggestion({
                    currentSearch,
                    proxi,
                });
            }, 60),
        }),
        bindEffect({
            toggleAttribute: {
                'aria-expanded': () =>
                    proxi.suggestionListActive ? 'true' : 'false',
            },
        }),
    ];

    return htmlObject({
        className: 'c-search-header',
        content: [
            {
                className: 'search-wrap',
                content: [
                    {
                        tag: 'input',
                        className: 'serach-input',
                        attributes: {
                            name: 'search_input',
                            id: 'search_input',
                            'aria-controls': 'suggestions',
                        },
                        modules: searchModules,
                    },
                    {
                        className: 'suggestion-wrap',
                        attributes: {
                            id: 'suggestions',
                        },
                        modules: [
                            setRef('suggestionElement'),
                            bindEffect({
                                toggleClass: {
                                    active: () => proxi.suggestionListActive,
                                },
                                toggleAttribute: {
                                    inert: () => !proxi.suggestionListActive,
                                },
                            }),
                        ],
                        content: {
                            component: SearchOverlaySuggestion,
                            modules: bindProps(
                                /** @returns {ReturnBindProps<SearchOverlaySuggestionType>} */
                                () => ({
                                    list: proxi.suggestionListData,
                                })
                            ),
                        },
                    },
                ],
            },
            /**
             * Submit
             */
            {
                tag: 'button',
                attributes: { type: 'button' },
                className: 'search-button',
                modules: delegateEvents({
                    click: () => {
                        sendToList({ getRef });
                    },
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event?.code?.toLowerCase() === 'enter') {
                            sendToList({ getRef });
                        }
                    },
                }),
                content: 'submit',
            },
            /**
             * Reset
             */
            {
                tag: 'button',
                attributes: { type: 'button' },
                className: 'search-button',
                modules: delegateEvents({
                    click: () => {
                        sendReset({ getRef, proxi });
                    },
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event?.code?.toLowerCase() === 'enter') {
                            sendReset({ getRef, proxi });
                        }
                    },
                }),
                content: 'reset',
            },
        ],
    });
};
