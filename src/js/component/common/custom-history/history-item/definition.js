import { MobJs } from '@mobJs';
import { HistoryItemFn } from './history-item';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HistoryItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HistoryItem>} */
    ({
        tag: 'history-item',
        component: HistoryItemFn,
        props: {
            id: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
            forceSelect: () => ({
                value: false,
                type: Boolean,
            }),
        },
        state: {
            checked: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
