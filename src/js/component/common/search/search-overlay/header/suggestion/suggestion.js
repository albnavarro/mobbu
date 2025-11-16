import { html } from '@mobJs';

/**
 * @import {MobComponent, ReturnBindProps} from '@mobJsType';
 * @import {SearchOverlaySugestionItem} from './suggestion-item/type';
 */

/** @type {MobComponent<import('./type').SearchOverlaySuggestion>} */
export const SearchOverlaySuggestionFn = ({ getProxi, repeat, bindProps }) => {
    const proxi = getProxi();

    return html`<div>
        <div class="search-overlay-suggestion">
            <ul class="search-overlay-suggestion__list">
                ${repeat({
                    observe: () => proxi.list,
                    key: 'word',
                    render: ({ current }) => {
                        return html`
                            <search-overlay-suggestion-item
                                ${bindProps(
                                    /**
                                     * @returns {ReturnBindProps<SearchOverlaySugestionItem>}
                                     */
                                    () => ({
                                        word: current.value.word,
                                        wordHiglight:
                                            current.value.wordHiglight,
                                    })
                                )}
                            >
                            </search-overlay-suggestion-item>
                        `;
                    },
                })}
            </ul>
        </div>
    </div>`;
};
