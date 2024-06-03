import { createComponent } from '../../../../mobjs';
import { DynamicListSlottedLabelFn } from './dynamicListSlottedLabel';

export const DynamicListSlottedLabel = createComponent({
    name: 'dynamic-slotted-label',
    component: DynamicListSlottedLabelFn,
    exportState: ['label'],
    state: {
        label: () => ({
            value: undefined,
            type: 'Any',
        }),
    },
});
