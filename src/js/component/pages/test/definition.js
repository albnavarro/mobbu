import { createComponentDefinition } from '../../../mobjs';
import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';
import { TestComponent3 } from './testComponent3';

export const testComponentDef = createComponentDefinition({
    name: 'TestComponent',
    component: TestComponent,
    state: {
        title: () => ({
            value: '',
            type: String,
        }),
        counter: () => ({
            value: 2,
            type: Number,
        }),
        data: () => ({
            value: [],
            type: Array,
        }),
        data2: () => ({
            value: [],
            type: Array,
        }),
    },
});

export const testComponent2Def = createComponentDefinition({
    name: 'TestComponent2',
    component: TestComponent2,
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

export const testComponent3Def = createComponentDefinition({
    name: 'TestComponent3',
    component: TestComponent3,
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
