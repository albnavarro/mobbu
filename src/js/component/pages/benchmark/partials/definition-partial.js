import { BenchMarkFakeComponent } from '../fake-component/definition';

export const benchMarkDefinitionPartial = (maxItem = 2001) => ({
    exportState: ['svg'],
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
    },
    child: [BenchMarkFakeComponent],
});
