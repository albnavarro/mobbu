import { MobJs } from '@mobJs';
import { SearchOverlaySuggestionFn } from './suggestion';
import { SearchOverlaySuggestionItem } from './suggestion-item/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SearchOverlaySuggestion = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlaySuggestion>} */
    ({
        tag: 'search-overlay-suggestion',
        component: SearchOverlaySuggestionFn,
        props: {
            list: () => ({
                value: [],
                type: Array,
            }),
        },
        child: [SearchOverlaySuggestionItem],
    })
);
