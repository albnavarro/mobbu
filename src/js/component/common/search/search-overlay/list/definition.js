import { MobJs } from '@mobJs';
import { SearchOverlayListFn } from './list';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const SearchOverlayList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayList>} */
    ({
        tag: 'search-overlay-list',
        component: SearchOverlayListFn,
        exportState: ['updatePrentSearchKey'],
        state: {
            list: () => ({
                value: [],
                type: Array,
            }),
            loading: () => ({
                value: false,
                type: Boolean,
            }),
            noResult: () => ({
                value: false,
                type: Boolean,
            }),
            updatePrentSearchKey: () => ({
                value: () => {},
                type: Function,
            }),
        },
    })
);
