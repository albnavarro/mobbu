import { MobCore } from '../../../src/js/mobCore';

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

const proxiState = myStore.getProxi();

myStore.watch('myProp', (value) => {
    console.log(value);
});

/**
 * Simple propierties
 */
proxiState.myProp = 'test value';
proxiState.myProp = 'test value 2';
proxiState.myProp = 'test value 3';

/**
 * For nested object is recommended use set/update
 * Since the proxy does not implement deep watch, it is necessary
 * to reassign the object
 */
proxiState.myObj = { prop: 3 };
proxiState.myObj = { ...proxiState.myObj, prop: 4 };

console.log(proxiState.myObj.prop);
