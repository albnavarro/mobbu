// Do not issue any callbacks
myStore.set('prop', 2, false);

// Clone data before mutate the stored data.
myStore.update('prop', (value) => value + 1, true, true);
