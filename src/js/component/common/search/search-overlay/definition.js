import { MobJs } from '@mobJs';
import { SearchOverlayFunction } from './search-overlay';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SearchOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlay>} */
    ({
        tag: 'search-overlay',
        component: SearchOverlayFunction,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
            currentSearch: {
                __value: '',
                __type: String,
            },
        },
    })
);
