const unsubscribe = mobCore.useScrollStart(({ scrollY }) => {
    // code
});

unsubscribe();

const unsubscribe = mobCore.useScrollEnd(({ scrollY }) => {
    // code
});

unsubscribe();
