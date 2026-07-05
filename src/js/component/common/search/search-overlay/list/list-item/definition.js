import { MobJs } from '@mobJs';
import { SearchOverlayListItemFunction } from './list-item';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const SearchOverlayListItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayListItemType>} */
    ({
        tag: 'search-overlay-list-item',
        component: SearchOverlayListItemFunction,
        props: {
            uri: {
                __value: '',
                __type: String,
            },
            breadCrumbs: {
                __value: [],
                __type: Array,
            },
            title: {
                __value: '',
                __type: String,
            },
            count: {
                __value: 0,
                __type: Number,
            },
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
