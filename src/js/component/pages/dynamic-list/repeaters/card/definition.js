//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCardFn } from './dynamic-list-card';
import { innerData } from '@pagesComponent/dynamic-list/data';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DynamicListCard = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListCardType>} */
    ({
        tag: 'dynamic-list-card',
        component: DynamicListCardFn,
        props: {
            parentListId: () => ({
                value: -1,
                type: Number,
            }),
            label: () => ({
                value: '-',
                type: String,
            }),
            index: () => ({
                value: -1,
                type: Number,
            }),
            counter: () => ({
                value: 1,
                type: Number,
            }),
        },
        state: {
            innerData: () => ({
                value: innerData[0],
                type: Array,
            }),
            innerDataUnivoque: () => ({
                value: innerData[0],
                type: Array,
            }),
            isSelected: () => ({
                value: false,
                type: Boolean,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
