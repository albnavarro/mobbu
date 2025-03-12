// @ts-check

import { MobCore } from '../mobCore';
import { MobJs } from '../mobjs';

export const storeTest = () => {
    const proxiStore = MobCore.createStore(
        /** @type{import('../mobCore/store/type').MobStoreParams<import('./type').proxiStore>} */
        ({
            proxiProp: 0,
        })
    );

    const proxiBind = proxiStore.getProxi();

    const storeTest = MobCore.createStore(
        /** @type{import('../mobCore/store/type').MobStoreParams<import('./type').StoreTest>} */
        ({
            prop: 1,
            myComputed: 0,
            myComputed2: 0,
            myComputed3: 0,
        })
    );

    storeTest.bindStore([proxiStore, MobJs.mainStore]);
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
    proxiBind.proxiProp = 43;

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

    storeTest.computed(
        'myComputed',
        ({ prop, proxiProp }) => {
            return prop * 2 + proxiProp;
        },
        ['prop', 'proxiProp']
    );

    storeTest.computed(
        'myComputed2',
        ({ myComputed }) => {
            return myComputed * 2;
        },
        ['myComputed']
    );

    storeTest.computed(
        'myComputed3',
        ({ myComputed2, prop }) => {
            return myComputed2 * 2 + prop;
        },
        ['myComputed2', 'prop']
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
        proxiBind.proxiProp += 2;
    }, 1000);
};
