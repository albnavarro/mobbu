//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCardFunction } from './dynamic-list-card';
import { innerData } from '@pagesComponent/dynamic-list/data';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DynamicListCard = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListCardType>} */
    ({
        tag: 'dynamic-list-card',
        component: DynamicListCardFunction,
        props: {
            parentListId: {
                __value: -1,
                __type: Number,
            },
            label: {
                __value: '-',
                __type: String,
            },
            index: {
                __value: -1,
                __type: Number,
            },
            counter: {
                __value: 1,
                __type: Number,
            },
        },
        state: {
            innerData: {
                __value: innerData[0],
                __type: Array,
            },
            innerDataUnivoque: {
                __value: innerData[0],
                __type: Array,
            },
            isSelected: {
                __value: false,
                __type: Boolean,
            },
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
