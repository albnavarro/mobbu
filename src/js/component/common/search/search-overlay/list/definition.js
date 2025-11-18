import { MobJs } from '@mobJs';
import { SearchOverlayListFn } from './list';
import { SearchOverlayListItem } from './list-item/definition';

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
            updatePrentSearchKey: () => ({
                value: () => {},
                type: Function,
            }),
        },
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
        },
        child: [SearchOverlayListItem],
    })
);
