const unsubscribe = myStore.watch(
    'prop',
    (newValue, oldValue, validation) => {
        //
    },
    { wait: true, immediate: true }
);

// Remove watcher froms store.
unsubscribe();
