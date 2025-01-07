// @ts-check

import { mobCore } from '../mobCore';

export const storeTest = () => {
    const proxiStore = mobCore.createStore({
        proxiProp: 0,
    });

    const proxiBind = proxiStore.getProxi();

    /** @type{import('../mobCore/store/type').MobStore<import('./type').StoreTest>} */
    const storeTest = mobCore.createStore({
        prop: 0,
        myComputed: 0,
        myComputed2: 0,
        myComputed3: 0,
    });

    storeTest.bindStore(proxiStore);
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

    storeTest.watch('myComputed', (value) => {
        console.log('myComputed', value);
    });

    storeTest.watch('myComputed2', (value) => {
        console.log('myComputed2', value);
    });

    storeTest.watch('myComputed3', (value) => {
        console.log('myComputed3', value);
    });

    storeTest.computed('myComputed3', ['myComputed2'], () => {
        return proxi.myComputed2 * 2;
    });

    storeTest.computed('myComputed2', ['myComputed'], () => {
        return proxi.myComputed * 2;
    });

    storeTest.computed('myComputed', ['prop'], () => {
        return proxi.prop * 2;
    });

    storeTest.set('prop', 10);
    proxi.prop = 100;
    console.log('paperino', storeTest.getProp('prop'));
};
