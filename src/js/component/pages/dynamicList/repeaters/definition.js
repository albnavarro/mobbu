//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCard } from '../card/definition';
import { DynamicListSlottedLabel } from '../slottedLabel/definition';
import { DynamicListRepeaterFn } from './dynamicListRepeater';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DynamicListRepeater = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicListRepeater>} */
    ({
        name: 'dynamic-list-repeater',
        component: DynamicListRepeaterFn,
        exportState: [
            'label',
            'clean',
            'data',
            'listId',
            'key',
            'listId',
            'counter',
        ],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            key: () => ({
                value: '',
                type: String,
            }),
            clean: () => ({
                value: false,
                type: Boolean,
            }),
            listId: () => ({
                value: -1,
                type: Number,
            }),
            counter: () => ({
                value: -1,
                type: Number,
            }),
            label: () => ({
                value: '',
                type: String,
            }),
        },
        child: [DynamicListCard, DynamicListSlottedLabel],
    })
);
