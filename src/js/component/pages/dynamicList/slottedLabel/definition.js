//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListSlottedLabelFn } from './dynamicListSlottedLabel';

/**
 * @import { CreateComponentParams } from "@mobJsType";
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
