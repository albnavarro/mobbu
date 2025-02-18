//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DynamicListCardInnerFn } from './dynamicListCardInner';

/**
 * @import { CreateComponentParams } from "../../../../../mobjs/type";
 **/

export const DynamicListCardInner = createComponent(
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
