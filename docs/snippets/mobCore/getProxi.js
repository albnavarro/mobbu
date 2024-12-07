import { mobCore } from '../../../src/js/mobCore';

const myStore = mobCore.createStore({
    myProp: () => ({
        value: '',
        type: String,
    }),
});

const proxiState = myStore.getProxi();

myStore.watch('myProp', (value) => {
    console.log(value);
});

proxiState.myProp = 'test value';
proxiState.myProp = 'test value 2';
proxiState.myProp = 'test value 3';
