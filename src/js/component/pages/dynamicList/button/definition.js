//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicListButtonFn } from './dynamicListButton';

export const DynamicListButton = createComponent({
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
});
