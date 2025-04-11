import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: () => ({
        value: '',
        type: 'any',
    }),
});

const myAsyncFunction = async (value) => {
    return new Promise((resolve) => {
        return setTimeout(() => {
            resolve(value + 1);
        }, 1000);
    });
};

myStore.watch('prop', async (value) => {
    const valueParsed = await myAsyncFunction(value);
    console.log(valueParsed);
});

myStore.set('myProp', 'test', { emit: false });
await myStore.emitAsync('myProp');
