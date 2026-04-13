import { MobJs } from '@mobJs';
import { SearchOverlayHeaderFn } from './header';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SearchOverlayHeader = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayHeader>} */
    ({
        tag: 'search-overlay-header',
        component: SearchOverlayHeaderFn,
        state: {
            suggestionListActive: () => ({
                value: false,
                type: Boolean,
            }),
            suggestionListData: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
