import { createComponent } from '../../../mobjs';
import { DynamicList } from './dynamicList';
import { DynamicListCard } from './dynamicListCard';
import { DynamicListCounter } from './dynamicListCounter';
import { DynamicListEmpty } from './dynamicListEmpty';
import { DynamicListSlot } from './dynamicListSlot';

export const dynamicListDef = createComponent({
    name: 'dynamic-list',
    component: DynamicList,
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: [
                {
                    key: 'a',
                    label: 'A',
                },
                {
                    key: 'b',
                    label: 'B',
                },
            ],
            type: Array,
        }),
        data2: () => ({
            value: [
                {
                    key: 'a',
                    label: 'A',
                },
                {
                    key: 'b',
                    label: 'B',
                },
            ],
            type: Array,
        }),
        data3: () => ({
            value: [
                {
                    key: 'a',
                    label: 'A',
                },
                {
                    key: 'b',
                    label: 'B',
                },
            ],
            type: Array,
        }),
    },
});

export const dynamicListCardDef = createComponent({
    name: 'dynamic-list-card',
    component: DynamicListCard,
    scoped: true,
    exportState: ['isFull', 'label', 'index', 'counter'],
    state: {
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

export const dynamicListEmptyDef = createComponent({
    name: 'dynamic-list-empty',
    component: DynamicListEmpty,
});

export const dynamicCounterDef = createComponent({
    name: 'dynamic-list-counter',
    component: DynamicListCounter,
    exportState: ['counter'],
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
    },
});
