export const defaultAmountOfCard = 10;

export const benchMarkDefinitionPartial = (maxItem = 1001) => ({
    state: {
        counter: {
            __value: 0,
            __type: Number,
        },
        data: {
            __value: Array.from({ length: defaultAmountOfCard })
                .keys()
                .map((item) => ({ label: `comp-${item + 1}` }))
                .toArray(),
            __type: Array,
            __validate: (/** @type {any[]} */ value) => value.length < maxItem,
            __strict: true,
            __skipEqual: false,
        },
        time: {
            __value: 0,
            __type: Number,
            __transform: (/** @type {number} */ value) => Math.round(value),
            __skipEqual: false,
        },
        isLoading: {
            __value: false,
            __type: Boolean,
        },
        currentIndex: {
            __value: -1,
            __type: Number,
        },
    },
});
