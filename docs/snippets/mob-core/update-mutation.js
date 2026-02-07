/**
 * Sbagliato: muta l'oggetto originale
 */
store.update('myObj', (obj) => {
    obj.nested = 1;
    return obj;
});

/**
 * Corretto: nuovo oggetto
 */
store.update('myObj', (obj) => ({
    ...obj,
    nested: 1,
}));

/**
 * Corretto: con clone
 */
store.update(
    'myObj',
    (obj) => {
        obj.nested = 1;
        return obj;
    },
    { clone: true }
);
