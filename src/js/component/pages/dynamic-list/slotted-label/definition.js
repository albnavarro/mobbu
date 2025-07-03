//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListSlottedLabelFn } from './dynamic-list-slotted-label';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DynamicListSlottedLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListSlottedLabel>} */
    ({
        tag: 'dynamic-slotted-label',
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
