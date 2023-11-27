const myStore = mobCore.createStore({
    myProps: () => ({
        value: {
            prop: {
                nestedProp: {
                    value: 2,
                },
            },
        },
        type: 'any',
    }),
});
