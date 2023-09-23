import { createComponent } from '../../../../mobjs';
import { DynamicListSlot } from './dynamicListSlot';

export const dynamicListSlotDef = createComponent({
    name: 'dynamic-list-slot',
    component: DynamicListSlot,
    exportState: [
        'staticFromSlot',
        'staticFromComponent',
        'parentParentState',
        'parentState',
    ],
    state: {
        staticFromSlot: () => ({
            value: '',
            type: 'any',
        }),
        staticFromComponent: () => ({
            value: '',
            type: 'any',
        }),
        parentParentState: () => ({
            value: '',
            type: 'any',
        }),
        parentState: () => ({
            value: '',
            type: 'any',
        }),
    },
});
