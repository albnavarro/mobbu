import { createComponentDefinition } from '../../../mobjs';
import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';

export const testComponentDef = createComponentDefinition({
    name: 'TestComponent',
    component: TestComponent,
    state: {
        title: '',
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
        label: () => {},
        index: () => ({
            value: -1,
            type: Number,
        }),
        computedLabel: '',
        isSelected: false,
    },
});
