import { mobCore } from '../../../src/js/mobCore';

const myStore = mobCore.createStore({
    myProp: () => ({
        value: '',
        type: String,
    }),
});

const proxiTest = myStore.getProxi();

myStore.watch('myProp', (value) => {
    console.log(value);
});

proxiTest.myProp = 'test value';
proxiTest.myProp = 'test value 2';
proxiTest.myProp = 'test value 3';
