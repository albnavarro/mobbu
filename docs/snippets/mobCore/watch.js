const unsubscribe = myStore.watch('prop', (newValue, oldValue, validation) => {
    //
});

// Remove watcher froms store.
unsubscribe();
