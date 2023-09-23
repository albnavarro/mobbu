import { createComponent } from '../../../../mobjs';
import { DynamicListCounter } from './dynamicListCounter';

export const dynamicCounterDef = createComponent({
    name: 'dynamic-list-counter',
    component: DynamicListCounter,
    exportState: ['counter', 'parentListId'],
    state: {
        parentListId: () => ({
            value: -1,
            type: Number,
        }),
        counter: () => ({
            value: 0,
            type: Number,
        }),
    },
});
