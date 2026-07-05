import { MobJs } from '@mobJs';
import { SearchOverlayHeaderFunction } from './header';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SearchOverlayHeader = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayHeader>} */
    ({
        tag: 'search-overlay-header',
        component: SearchOverlayHeaderFunction,
        state: {
            suggestionListActive: {
                __value: false,
                __type: Boolean,
            },
            suggestionListData: {
                __value: [],
                __type: Array,
            },
        },
    })
);
