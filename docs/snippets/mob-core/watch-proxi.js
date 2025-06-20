const proxi = myStore.getProxi();

const unsubscribe = myStore.watch(
    () => proxi.prop,
    (newValue, oldValue, validation) => {
        //
    },
    { wait: true, immediate: true }
);

// Remove watcher froms store.
unsubscribe();
