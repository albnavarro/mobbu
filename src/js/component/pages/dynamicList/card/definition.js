import { createComponent } from '../../../../mobjs';
import { DynamicListCard } from './dynamicListCard';

export const dynamicListCardDef = createComponent({
    name: 'dynamic-list-card',
    component: DynamicListCard,
    scoped: true,
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
});
