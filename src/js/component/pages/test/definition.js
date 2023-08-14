import { createComponentDefinition } from '../../../mobjs';
import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';

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
