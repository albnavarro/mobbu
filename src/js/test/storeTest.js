// @ts-check

import { mobCore } from '../mobCore';

export const storeTest = () => {
    const storeTest = mobCore.createStore({
        prop: 0,
        myComputed: 0,
        myComputed2: 0,
        myComputed3: 0,
    });

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

    storeTest.computed('myComputed3', ['myComputed2'], ({ myComputed2 }) => {
        return myComputed2 * 2;
    });

    storeTest.computed('myComputed2', ['myComputed'], ({ myComputed }) => {
        return myComputed * 2;
    });

    storeTest.computed('myComputed', ['prop'], ({ prop }) => {
        return prop * 2;
    });

    storeTest.set('prop', 10);
};
