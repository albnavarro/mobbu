import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myMap: () => ({
        value: new Map(),
        type: Map,
        skipEqual: false, // !important
    }),
});

const proxi = myStore.getProxi();

myStore.watch(
    () => proxi.myMap,
    (current, previous) => {
        // current and previous is equal, map is not reassigned.
        console.log(current === previous);
    }
);

myStore.update(proxi.myMap, (value) => value.set('myKey', 10));
myStore.set(proxi.myMap, proxi.myMap.set('myKey', 11));
proxi.myMap = proxi.myMap.set('myKey', 12);

/**
 * Alternative:
 */
proxi.myMap.set('myKey', 12);
myStore.emit(() => proxi.myMap);
