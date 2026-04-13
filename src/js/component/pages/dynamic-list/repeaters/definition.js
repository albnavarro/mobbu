import { MobJs } from '@mobJs';
import { DynamicListRepeaterFn } from './dynamic-list-repeater';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DynamicListRepeater = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListRepeaterType>} */
    ({
        tag: 'dynamic-list-repeater',
        component: DynamicListRepeaterFn,
        props: {
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
    })
);
