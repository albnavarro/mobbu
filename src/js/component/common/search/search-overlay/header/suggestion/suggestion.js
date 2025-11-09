/**
 * @import {MobComponent} from '@mobJsType';
 */

import { html } from '@mobJs';
import { closeSearchSuggestion, updateSearchFromSuggestion } from '../utils';

/**
 * @param {object} params
 * @param {string} params.code
 * @param {string} params.word
 * @returns {void}
 */
const onKeyDown = ({ code, word }) => {
    if (code.toLowerCase() === 'enter') {
        updateSearchFromSuggestion(word);
        return;
    }

    if (code.toLowerCase() === 'escape') {
        closeSearchSuggestion();
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
                    observe: () => proxi.list,
                    key: 'word',
                    render: ({ current }) => {
                        return html`
                            <li class="search-overlay-suggestion__item">
                                <button
                                    type="button"
                                    class="search-overlay-suggestion__button"
                                    ${delegateEvents({
                                        click: () => {
                                            updateSearchFromSuggestion(
                                                current.value.word
                                            );
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
