import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myMap: () => ({
        value: new Map(),
        type: Map,
        skipEqual: false,
    }),
});

const proxi = myStore.getProxi();

myStore.watch(
    () => proxi.myMap,
    (current) => {
        console.log('Map updated:', current.get('myKey'));
    }
);

// Metodo 1: Diretto (raccomandato)
proxi.myMap.set('myKey', 10);
myStore.emit('myMap');

// Metodo 2: Update con clone
myStore.update(
    () => proxi.myMap,
    (map) => {
        map.set('myKey', 11);
        return map;
    },
    { clone: true }
);
