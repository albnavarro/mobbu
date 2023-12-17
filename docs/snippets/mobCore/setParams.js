// Do not issue any callbacks
myStore.set('prop', 2, false);

// Clone data before mutate the stored data.
myStore.set('prop', (value) => value + 1, true, true);
