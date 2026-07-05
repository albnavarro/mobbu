import { MobJs } from '@mobJs';
import { SearchOverlaySuggestionFunction } from './suggestion';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SearchOverlaySuggestion = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlaySuggestionType>} */
    ({
        tag: 'search-overlay-suggestion',
        component: SearchOverlaySuggestionFunction,
        props: {
            list: {
                __value: [],
                __type: Array,
            },
        },
    })
);
