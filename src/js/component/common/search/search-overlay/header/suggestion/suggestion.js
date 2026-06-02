import { htmlObject } from '@mobJs';
import { SearchOverlaySuggestionItem } from './suggestion-item/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from '@mobJsType'
 * @import {SearchOverlaySugestionItemType} from './suggestion-item/type'
 */

/** @type {MobComponent<import('./type').SearchOverlaySuggestionType>} */
export const SearchOverlaySuggestionFn = ({
    getSelfProxi,
    repeat,
    bindProps,
}) => {
    const proxi = getSelfProxi();

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
            tag: 'nav',
            className: 'c-search-suggestion',
            attributes: { 'aria-label': 'Suggestions' },
            content: {
                tag: 'ul',
                className: 'list',
                content: repeaterRender,
            },
        },
    });
};
