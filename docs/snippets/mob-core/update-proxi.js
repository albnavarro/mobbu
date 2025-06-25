const proxi = myStore.getProxi();

// Default
myStore.update(
    () => proxi.prop,
    (oldValue) => {
        return oldValue + 1;
    }
);

// Object
myStore.update(
    () => proxi.myObject,
    (obj) => {
        return { ...obj, prop: 10 };
    },
    { clone: true, emit: true }
);
