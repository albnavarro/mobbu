import { MobJs } from '@mobJs';
import { SearchOverlayListItemFn } from './list-item';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SearchOverlayListItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayListItem>} */
    ({
        tag: 'search-overlay-list-item',
        component: SearchOverlayListItemFn,
        props: {
            uri: () => ({
                value: '',
                type: String,
            }),
            breadCrumbs: () => ({
                value: '',
                type: String,
            }),
            title: () => ({
                value: '',
                type: String,
            }),
            count: () => ({
                value: 0,
                type: Number,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
