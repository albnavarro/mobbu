import { mobCore } from '../../../src/js/mobCore';

const storeOne = mobCore.createStore({
    prop1: 0,
    sum: 0,
});

const storeTwo = mobCore.createStore({
    prop2: 0,
});

storeOne.bindStore([storeTwo]);

storeOne.watch('sum', (sum) => {
    console.log(sum);
});

storeOne.computed(
    'sum',
    ['prop1', 'prop2'],
    ({ prop1, prop2 }) => {
        return prop1 + prop2;
    },
    { immediate: true }
);

storeOne.set('prop1', 2);
storeTwo.set('prop2', 4);
