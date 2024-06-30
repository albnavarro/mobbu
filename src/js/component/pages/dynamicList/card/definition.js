//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicCounter } from '../counter/definition';
import { DynamicListEmpty } from '../empty/definition';
import { DynamicListCardFn } from './dynamicListCard';

export const DynamicListCard = createComponent({
    name: 'dynamic-list-card',
    component: DynamicListCardFn,
    exportState: ['isFull', 'label', 'index', 'counter', 'parentListId'],
    state: {
        parentListId: () => ({
            value: -1,
            type: Number,
        }),
        isFull: () => ({
            value: false,
            type: Boolean,
        }),
        label: () => ({
            value: '-',
            type: String,
        }),
        index: () => ({
            value: -1,
            type: Number,
        }),
        counter: () => ({
            value: 0,
            type: Number,
        }),
    },
    child: [DynamicCounter, DynamicListEmpty],
});
