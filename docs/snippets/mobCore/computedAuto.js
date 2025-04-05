import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    dependency1: 1,
    dependency2: 2,
});

const proxi = myStore.getProxi();

myStore.computed('prop', () => {
    return proxi.dependency1 + proxi.dependency2;
});
