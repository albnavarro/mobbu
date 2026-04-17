import { BenchMarkFakeComponent } from '../fake-component/definition';

export const benchMarkDefinitionPartial = (maxItem = 1001) => ({
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: [
                { label: 'comp-1' },
                { label: 'comp-2' },
                { label: 'comp-3' },
                { label: 'comp-4' },
                { label: 'comp-5' },
                { label: 'comp-6' },
                { label: 'comp-7' },
                { label: 'comp-8' },
                { label: 'comp-9' },
                { label: 'comp-10' },
            ],
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
            value: -1,
            type: Number,
        }),
    },
    child: [BenchMarkFakeComponent],
});
