import { createComponent } from '../../../mobjs';
import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';
import { TestComponent3 } from './testComponent3';
import { TestComponent4 } from './testComponent4';

export const testComponentDef = createComponent({
    name: 'TestComponent',
    component: TestComponent,
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

export const testComponent2Def = createComponent({
    name: 'TestComponent2',
    component: TestComponent2,
    asyncCreation: false,
    exportState: ['label', 'index', 'counter'],
    state: {
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
    name: 'TestComponent3',
    component: TestComponent3,
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
    name: 'TestComponent4',
    component: TestComponent4,
});
