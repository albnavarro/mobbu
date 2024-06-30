//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicListCounterFn } from './dynamicListCounter';

export const DynamicCounter = createComponent({
    name: 'dynamic-list-counter',
    component: DynamicListCounterFn,
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
