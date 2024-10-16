import { BenchMarkFakeComponent } from '../fakeComponent/definition';

export const benchMarkDefinitionPartial = {
    exportState: ['svg'],
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: [],
            type: Array,
            validate: (value) => value.length < 2001,
            strict: true,
            skipEqual: false,
        }),
        time: () => ({
            value: 0,
            type: Number,
            transform: (value) => Math.round(value),
            skipEqual: false,
        }),
        isLoading: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [BenchMarkFakeComponent],
};
