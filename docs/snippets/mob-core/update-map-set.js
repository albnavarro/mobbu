import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myMap: () => ({
        value: new Map(),
        type: Map,
    }),
});

const proxi = myStore.getProxi();
myStore.update(proxi.myMap, (value) => value.set('myKey', 10));
