import { MobJs } from '@mobJs';
import { SearchOverlayListFn } from './list';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SearchOverlayList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayList>} */
    ({
        tag: 'search-overlay-list',
        component: SearchOverlayListFn,
        bindStore: MobJs.mainStore,
        props: {
            updatePrentSearchKey: {
                __value: () => {},
                __type: Function,
            },
        },
        state: {
            list: {
                __value: [],
                __type: Array,
            },
            loading: {
                __value: false,
                __type: Boolean,
            },
            noResult: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
