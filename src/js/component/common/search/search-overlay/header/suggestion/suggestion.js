import { htmlObject } from '@mobJs';
import { SearchOverlaySuggestionItem } from './suggestion-item/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {SearchOverlaySugestionItemType} from "./suggestion-item/type"
 */

/** @type {MobComponent<import('./type').SearchOverlaySuggestionType>} */
export const SearchOverlaySuggestionFn = ({ getProxi, repeat, bindProps }) => {
    const proxi = getProxi();

    const repeaterRender = repeat({
        observe: () => proxi.list,
        key: 'word',
        render: ({ current }) => {
            return htmlObject({
                component: SearchOverlaySuggestionItem,
                modules: bindProps(
                    /**
                     * @returns {ReturnBindProps<SearchOverlaySugestionItemType>}
                     */
                    () => ({
                        word: current.value.word,
                        wordHiglight: current.value.wordHiglight,
                    })
                ),
            });
        },
    });

    return htmlObject({
        content: {
            className: 'c-search-suggestion',
            content: {
                tag: 'ul',
                className: 'list',
                content: repeaterRender,
            },
        },
    });
};
