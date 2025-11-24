import { BenchMarkFakeComponent } from '../fake-component/definition';

export const benchMarkDefinitionPartial = (maxItem = 1001) => ({
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: [],
            type: Array,
            validate: (/** @type {any[]} */ value) => value.length < maxItem,
            strict: true,
            skipEqual: false,
        }),
        time: () => ({
            value: 0,
            type: Number,
            transform: (/** @type {number} */ value) => Math.round(value),
            skipEqual: false,
        }),
        isLoading: () => ({
            value: false,
            type: Boolean,
        }),
        currentIndex: () => ({
            value: 11,
            type: Number,
            validate: (val) => val > 10,
        }),
        plutone: {
            prop: () => ({
                value: 11,
                type: 'number',
                validate: (val) => val > 10,
                strict: false,
            }),
            prop2: () => ({
                value: 5,
                type: 'number',
                validate: (val) => val > 10,
                strict: false,
            }),
        },
    },
    child: [BenchMarkFakeComponent],
});
