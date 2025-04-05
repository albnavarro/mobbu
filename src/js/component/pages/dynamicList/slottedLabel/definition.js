//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { DynamicListSlottedLabelFn } from './dynamicListSlottedLabel';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const DynamicListSlottedLabel = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicListSlottedLabel>} */
    ({
        name: 'dynamic-slotted-label',
        component: DynamicListSlottedLabelFn,
        exportState: ['label'],
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
