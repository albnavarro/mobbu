import { MobCore } from '../../../src/js/mobCore';

const storeOne = MobCore.createStore({
    prop1: 0,
    sum: 0,
});

const storeTwo = MobCore.createStore({
    prop2: 0,
});

storeOne.bindStore([storeTwo]);
const proxi = storeOne.getProxi();

storeOne.watch('sum', (sum) => {
    console.log(sum);
});

storeOne.computed('sum', () => {
    return proxi.prop1 + proxi.prop2;
});

storeOne.set('prop1', 2);
storeTwo.set('prop2', 4);
