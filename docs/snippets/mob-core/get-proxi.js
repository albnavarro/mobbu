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
 * For nested object is recommended use set/update
 * Since the proxy does not implement deep watch, it is necessary
 * to reassign the object
 */
proxi.myObj = { prop: 3 };
proxi.myObj = { ...proxi.myObj, prop: 4 };

console.log(proxi.myObj.prop);
