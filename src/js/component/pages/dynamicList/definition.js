import { createComponent } from '../../../mobjs';
import { DynamicList } from './dynamicList';
import { DynamicListCard } from './dynamicListCard';
import { DynamicListChildTest } from './dynamicListChildTest';
import { DynamicListSlot } from './dynamicListSlot';

export const dynamicListDef = createComponent({
    name: 'DynamicList',
    component: DynamicList,
    exportState: ['title'],
    state: {
        title: () => ({
            value: '',
            type: String,
        }),
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
    },
});

export const dynamicListCardDef = createComponent({
    name: 'DynamicListCard',
    component: DynamicListCard,
    asyncCreation: false,
    exportState: ['isFull', 'label', 'index', 'counter'],
    state: {
        isFull: () => ({
            value: false,
            type: Boolean,
        }),
        label: () => ({
            value: '',
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
        computedLabel: () => ({
            value: () => {},
            type: Function,
        }),
    },
});

export const testComponent3Def = createComponent({
    name: 'DynamicListSlot',
    component: DynamicListSlot,
    exportState: [
        'staticFromSlot',
        'staticFromComponent',
        'parentParentState',
        'parentState',
        'counter',
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
        counter: () => ({
            value: 0,
            type: 'any',
        }),
    },
});

export const testComponent4Def = createComponent({
    name: 'DynamicListChildTest',
    component: DynamicListChildTest,
});
