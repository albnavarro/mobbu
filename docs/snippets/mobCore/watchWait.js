const unsubscribe = myStore.watch(
    'prop',
    (newValue, oldValue, validation) => {
        //
    },
    { wait: true }
);

// Remove watcher froms store.
unsubscribe();
