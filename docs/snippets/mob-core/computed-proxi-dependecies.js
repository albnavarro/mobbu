// use proxi as dependencies
myStore.computed('prop', () => {
    return proxi.dependency1 + proxi.dependency2;
});

// use proxi as propierites and dependencies
myStore.computed(
    () => proxi.prop,
    () => {
        return proxi.dependency1 + proxi.dependency2;
    },
    [() => proxi.dependency1, () => proxi.dependency2]
);
