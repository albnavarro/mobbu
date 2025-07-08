/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { html } from '@mobJs';
import { searchOverlayHeader } from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

/**
 * @param {string} word
 * @returns {void}
 */
const sendWord = (word) => {
    /**
     * @type {UseMethodByName<import('../type').SearchOverlayHeader>}
     */
    const headerMethods = useMethodByName(searchOverlayHeader);
    headerMethods?.forceInputValue(word);
};

const onEsc = () => {
    /**
     * @type {UseMethodByName<import('../type').SearchOverlayHeader>}
     */
    const headerMethods = useMethodByName(searchOverlayHeader);
    headerMethods?.closeSuggestion();
};

/**
 * @param {object} params
 * @param {string} params.code
 * @param {string} params.word
 * @returns {void}
 */
const onKeyDown = ({ code, word }) => {
    if (code.toLowerCase() === 'enter') {
        sendWord(word);
        return;
    }

    if (code.toLowerCase() === 'escape') {
        onEsc();
        return;
    }
};

/** @type {MobComponent<import('./type').SearchOverlaySuggestion>} */
export const SearchOverlaySuggestionFn = ({
    getProxi,
    repeat,
    bindObject,
    delegateEvents,
}) => {
    const proxi = getProxi();

    return html`<div>
        <div class="search-overlay-suggestion">
            <ul class="search-overlay-suggestion__list">
                ${repeat({
                    bind: () => proxi.list,
                    key: 'word',
                    render: ({ current }) => {
                        return html`
                            <li class="search-overlay-suggestion__item">
                                <button
                                    type="button"
                                    class="search-overlay-suggestion__button"
                                    ${delegateEvents({
                                        click: () => {
                                            sendWord(current.value.word);
                                        },
                                        keydown: (
                                            /** @type {KeyboardEvent} */ event
                                        ) => {
                                            event.preventDefault();

                                            onKeyDown({
                                                code: event.code,
                                                word: current.value.word,
                                            });
                                        },
                                    })}
                                >
                                    ${bindObject`${() => current.value.wordHiglight}`}
                                </button>
                            </li>
                        `;
                    },
                })}
            </ul>
        </div>
    </div>`;
};
