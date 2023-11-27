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

// Default
myStore.set('prop', 2);
myStore.set('prop', (oldValue) => {
    return oldValue + 1;
});

// Object
myStore.set('myObject', { prop: 10 });
myStore.set('myObject', (obj) => {
    return { ...obj, prop: 10 };
});
