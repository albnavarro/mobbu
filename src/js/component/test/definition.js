import { TestComponent } from './testComponent';
import { TestComponent2 } from './testComponent2';

export const testComponentDef = {
    TestComponent: {
        componentFunction: TestComponent,
        componentParams: {
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
        },
    },
    TestComponent2: {
        componentFunction: TestComponent2,
        componentParams: {
            state: {
                index: () => ({
                    value: -1,
                    type: Number,
                }),
                isBlack: false,
            },
        },
    },
};
