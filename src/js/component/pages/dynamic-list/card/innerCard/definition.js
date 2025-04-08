//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCardInnerFn } from './dynamic-list-card-inner';

/**
 * @import { CreateComponentParams } from "@mobJsType";
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
