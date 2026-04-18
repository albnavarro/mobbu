import { BenchMarkFakeComponent } from '../fake-component/definition';

export const defaultAmountOfCard = 10;

export const benchMarkDefinitionPartial = (maxItem = 1001) => ({
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: [...Array.from({ length: defaultAmountOfCard }).keys()].map(
                (item) => ({ label: `comp-${item + 1}` })
            ),
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
