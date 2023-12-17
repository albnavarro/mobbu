/**
 * module1.js
 * Define async callback.
 */
myStore.watch('prop', async (value) => {
    await myAsyncFunction(value);
});

/**
 * module2.js
 * Set prop without execute related callBack.
 * Fire related async callBack.
 */
myStore.set('myProp', value, false);
await myStore.emitAsync('myProp');
