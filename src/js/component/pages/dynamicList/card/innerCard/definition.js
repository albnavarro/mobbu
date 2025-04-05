//@ts-check

import { MobJs } from '../../../../../mob/mobjs';
import { DynamicListCardInnerFn } from './dynamicListCardInner';

/**
 * @import { CreateComponentParams } from "../../../../../mob/mobjs/type";
 **/

export const DynamicListCardInner = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicListCardInner>} */
    ({
        name: 'dynamic-list-card-inner',
        component: DynamicListCardInnerFn,
        exportState: ['key'],
        state: {
            key: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
