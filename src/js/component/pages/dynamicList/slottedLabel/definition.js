import { createComponent } from '../../../../mobjs';
import { DynamicListSlottedLabel } from './dynamicListSlottedLabel';

export const dynamicListLabelDef = createComponent({
    name: 'dynamic-slotted-label',
    component: DynamicListSlottedLabel,
    exportState: ['genericData'],
    state: {
        genericData: () => ({
            value: undefined,
            type: 'Any',
        }),
    },
});
