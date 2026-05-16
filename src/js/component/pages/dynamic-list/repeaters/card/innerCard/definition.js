//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCardInnerFn } from './dynamic-list-card-inner';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DynamicListCardInner = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListCardInnerType>} */
    ({
        tag: 'dynamic-list-card-inner',
        component: DynamicListCardInnerFn,
        props: {
            key: {
                __value: '',
                __type: String,
            },
        },
    })
);
