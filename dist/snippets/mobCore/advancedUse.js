const myStore = mobCore.createStore({
    myProps: () => ({
        value: 0,
        type: Number,
        validate: (val) => {
            return val > 0;
        },
        skipEqual: false,
        strict: false,
    }),
    myObject: {
        myProps: () => ({
            value: 'option1',
            type: String,
            validate: (val) => {
                return ['option1', 'option2'].includes(val);
            },
        }),
        myProps2: () => ({
            value: [],
            type: Array,
        }),
    },
});
