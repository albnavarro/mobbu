import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myMap: () => ({
        value: new Map(),
        type: Map,
        skipEqual: false,
    }),
});

const proxi = myStore.getProxi();

// proxi
proxi.myMap = proxi.myMap.set('myKey', 10);

// set
myStore.set(() => proxi.myMap, proxi.myMap.set('myKey', 10));
