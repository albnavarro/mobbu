import { MobJs } from '@mobJs';
import { DynamicListRepeaterFunction } from './dynamic-list-repeater';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DynamicListRepeater = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListRepeaterType>} */
    ({
        tag: 'dynamic-list-repeater',
        component: DynamicListRepeaterFunction,
        props: {
            data: {
                __value: [],
                __type: Array,
            },
            key: {
                __value: '',
                __type: String,
            },
            clean: {
                __value: false,
                __type: Boolean,
            },
            listId: {
                __value: -1,
                __type: Number,
            },
            counter: {
                __value: -1,
                __type: Number,
            },
            label: {
                __value: '',
                __type: String,
            },
        },
    })
);
