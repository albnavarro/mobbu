import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myProp: () => ({
        value: '',
        type: String,
    }),
    myObj: () => ({
        value: { prop: 2 },
        type: 'any',
    }),
    myComplexObj: {
        prop: () => ({
            value: 2,
            type: Number,
        }),
    },
});

const proxi = myStore.getProxi();

myStore.watch('myProp', (value) => {
    console.log(value);
});

/**
 * Simple propierties
 */
proxi.myProp = 'test value';
proxi.myProp = 'test value 2';
proxi.myProp = 'test value 3';

/**
 * - Since the proxy does not implement deep watch, it is necessary to reassign the object
 */
proxi.myObj = { prop: 3 }; // wrong
proxi.myObj = { ...proxi.myObj, prop: 4 }; // right
proxi.myComplexObj = { ...proxi.myComplexObj, prop: 4 }; // right

console.log(proxi.myObj.prop);
