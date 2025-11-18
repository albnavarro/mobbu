//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCardFn } from './dynamic-list-card';
import { DynamicListCardInner } from './innerCard/definition';
import { innerData } from '@pagesComponent/dynamic-list/data';
import { DynamicCounter } from './counter/definition';
import { DynamicListEmpty } from './empty/definition';
import { DynamicListButton } from '@pagesComponent/dynamic-list/button/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DynamicListCard = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListCard>} */
    ({
        tag: 'dynamic-list-card',
        component: DynamicListCardFn,
        props: {
            parentListId: () => ({
                value: -1,
                type: Number,
            }),
            isFull: () => ({
                value: false,
                type: Boolean,
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
        child: [
            DynamicCounter,
            DynamicListEmpty,
            DynamicListCardInner,
            DynamicListButton,
        ],
    })
);
