import { createComponentDefinition } from '../../../mobjs';
import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';

export const testComponentDef = createComponentDefinition({
    name: 'TestComponent',
    component: TestComponent,
    props: {
        title: '',
    },
    state: {
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
    props: {
        label: () => {},
    },
    state: {
        index: () => ({
            value: -1,
            type: Number,
        }),
        isSelected: false,
    },
});
