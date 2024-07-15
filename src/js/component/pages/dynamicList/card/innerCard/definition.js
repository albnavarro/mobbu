//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DynamicListCardInnerFn } from './dynamicListCardInner';

export const DynamicListCardInner = createComponent({
    name: 'dynamic-list-card-inner',
    component: DynamicListCardInnerFn,
    exportState: ['key'],
    state: {
        key: () => ({
            value: 0,
            type: Number,
        }),
    },
});
