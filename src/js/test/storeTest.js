// @ts-check

import { mobCore } from '../mobCore';
import { mainStore } from '../mobjs';

export const storeTest = () => {
    /** @type{import('../mobCore/store/type').MobStore<import('./type').proxiStore>} */
    const proxiStore = mobCore.createStore({
        proxiProp: 0,
    });

    const proxiBind = proxiStore.getProxi();

    /** @type{import('../mobCore/store/type').MobStore<import('./type').StoreTest>} */
    const storeTest = mobCore.createStore({
        prop: 1,
        myComputed: 0,
        myComputed2: 0,
        myComputed3: 0,
    });

    storeTest.bindStore([proxiStore, mainStore]);
    const proxi = storeTest.getProxi();

    storeTest.watch(
        'proxiProp',
        (value) => {
            console.log('---');
            console.log('proxiProp', value);
            console.log('proxiProp getProp', storeTest.getProp('proxiProp'));
            console.log('proxiProp proxi', proxi.proxiProp);
            console.log('---');
        },
        { wait: true }
    );

    proxiBind.proxiProp = 20;
    proxiBind.proxiProp = 30;
    proxiBind.proxiProp = 40;

    storeTest.watch('prop', (value) => {
        console.log('prop', value);
    });

    storeTest.watch('afterRouteChange', (value) => {
        console.log('mainStore', value.route);
    });

    storeTest.watch('myComputed', (value) => {
        console.log('myComputed', value);
    });

    storeTest.watch('myComputed2', (value) => {
        console.log('myComputed2', value);
    });

    storeTest.watch('myComputed3', (value) => {
        console.log('myComputed3', value);
    });

    storeTest.computed('myComputed', ['prop'], ({ prop }) => {
        return prop * 2;
    });

    storeTest.computed('myComputed2', ['myComputed'], ({ myComputed }) => {
        return myComputed * 2;
    });

    storeTest.computed(
        'myComputed3',
        ['myComputed2', 'prop'],
        ({ myComputed2, prop }) => {
            return myComputed2 * 2 + prop;
        }
    );

    /**
     * Initial value
     */
    console.log('prop', proxi.prop);
    console.log('myComputed first value', proxi.myComputed);
    console.log('myComputed2 first value', proxi.myComputed2);
    console.log('myComputed3 first value', proxi.myComputed3);

    storeTest.set('prop', 10);
    proxi.prop = 100;
    console.log('paperino', storeTest.getProp('prop'));

    setInterval(() => {
        proxi.prop += 10;
    }, 1000);
};
