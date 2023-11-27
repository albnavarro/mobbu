const myStore = mobCore.createStore({
    prop: 0,
    myObject: {
        prop: () => ({
            value: 0,
            type: Number,
        }),
        prop2: () => ({
            value: 0,
            type: Number,
        }),
    },
});

// Do not issue any callbacks
myStore.set('prop', 2, false);

// Clone data before mutate the stored data.
myStore.set('prop', (value) => value + 1, true, true);
