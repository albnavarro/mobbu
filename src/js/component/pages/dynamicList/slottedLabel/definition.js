import { createComponent } from '../../../../mobjs';
import { DynamicListSlottedLabel } from './dynamicListSlottedLabel';

export const dynamicListLabelDef = createComponent({
    name: 'dynamic-slotted-label',
    component: DynamicListSlottedLabel,
    exportState: ['label'],
    state: {
        label: () => ({
            value: undefined,
            type: 'Any',
        }),
    },
});
