//@ts-check

import { MobCore } from '../mob/mob-core';
import { MobJs } from '../mob/mob-js';

export const storeTest = () => {
    const proxiStore = MobCore.createStore(
        /** @type {import('../mob/mob-core/store/type').MobStoreParams<import('./type').proxiStore>} */
        ({
            proxiProp: 0,
        })
    );

    const proxiBind = proxiStore.getProxi();

    const storeTest = MobCore.createStore(
        /** @type {import('../mob/mob-core/store/type').MobStoreParams<import('./type').StoreTest>} */
        ({
            prop: 1,
            myComputed: 0,
            myComputed2: 0,
            myComputed3: 0,
        })
    );

    storeTest.bindStore([proxiStore, MobJs.mainStore]);
    const proxi = storeTest.getProxi();

    // storeTest.watch(
    //     'proxiProp',
    //     (value) => {
    //         console.log('---');
    //         console.log('proxiProp', value);
    //         console.log('proxiProp getProp', storeTest.getProp('proxiProp'));
    //         console.log('proxiProp proxi', proxi.proxiProp);
    //         console.log('---');
    //     },
    //     { wait: true }
    // );

    proxiBind.proxiProp = 1;

    storeTest.watch(
        () => proxi.prop,
        (value) => {
            console.log('prop', value);
        }
    );

    storeTest.watch(
        () => proxi.afterRouteChange,
        (value) => {
            console.log('mainStore', value.route);
        }
    );

    storeTest.watch(
        () => proxi.myComputed,
        (value) => {
            console.log('myComputed', value);
        }
    );

    storeTest.watch(
        () => proxi.myComputed2,
        (value) => {
            console.log('myComputed2', value);
        }
    );

    storeTest.watch(
        () => proxi.myComputed3,
        (value) => {
            console.log('myComputed3', value);
        }
    );

    storeTest.computed(
        () => proxi.myComputed,
        () => {
            return proxi.prop + proxi.proxiProp;
        }
    );

    storeTest.computed(
        () => proxi.myComputed2,
        () => {
            return proxi.myComputed + 1;
        }
    );

    storeTest.computed(
        () => proxi.myComputed3,
        () => {
            return proxi.myComputed2 + 1;
        }
    );

    /**
     * Initial value
     */
    console.log('prop', proxi.prop);
    console.log('myComputed first value', proxi.myComputed);
    console.log('myComputed2 first value', proxi.myComputed2);
    console.log('myComputed3 first value', proxi.myComputed3);

    setInterval(() => {
        proxi.prop += 1;
        proxiBind.proxiProp += 2;
        console.log('----');
    }, 1000);
};
