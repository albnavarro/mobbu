import { createComponent } from '../../../../mobjs';
import { dynamicCounterDef } from '../counter/definition';
import { dynamicListEmptyDef } from '../empty/definition';
import { DynamicListCard } from './dynamicListCard';

export const dynamicListCardDef = createComponent({
    name: 'dynamic-list-card',
    component: DynamicListCard,
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
    child: [dynamicCounterDef, dynamicListEmptyDef],
});
