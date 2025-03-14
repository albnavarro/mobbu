//@ts-check

import { MobJs } from '../../../../mobjs';
import { DynamicListButtonFn } from './dynamicListButton';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DynamicListButton = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicListButton>} */
    ({
        name: 'dynamic-list-button',
        component: DynamicListButtonFn,
        exportState: ['active', 'label'],
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
