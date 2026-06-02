import { MobJs } from '@mobJs';
import { SearchOverlaySuggestionItemFn } from './suggestion-item';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SearchOverlaySuggestionItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlaySugestionItemType>} */
    ({
        tag: 'search-overlay-suggestion-item',
        component: SearchOverlaySuggestionItemFn,
        props: {
            word: {
                __value: '',
                __type: String,
            },
            wordHiglight: {
                __value: '',
                __type: String,
            },
        },
    })
);
