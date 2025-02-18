//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicListSlottedLabelFn } from './dynamicListSlottedLabel';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DynamicListSlottedLabel = createComponent(
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
