import { mobStore } from '../mobCore/store/MapVersion/index.js';

export const initTestMapStore = async () => {
    const test = mobStore({
        prop1: () => ({
            value: 30,
            type: Number,
            skipEqual: false,
            validate: (val) => {
                return val > 100;
            },
            strict: false,
        }),
        prop2: () => ({
            value: 'init prop2',
            type: String,
        }),
        computedProp: () => ({
            value: 'ddddd',
            type: String,
        }),
    });

    test.computed('computedProp', ['prop1', 'prop2'], (prop1, prop2) => {
        return `${prop1}_${prop2}`;
    });

    const unsubscribe = test.watch('prop1', (val, old, validate) => {
        console.log('sync', val, old, validate);
    });

    const unsubscribe2 = test.watch('prop2', async (val, old, validate) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('async', val, old, validate);
                resolve();
            }, 2000);
        });
    });

    // unsubscribe();
    // unsubscribe2();

    test.set('prop1', 20);
    const { prop1 } = test.get();
    console.log(prop1);

    test.set('prop1', 130);
    const { prop1: prop12 } = test.get();
    console.log(prop12);

    test.emit('prop1');
    const pippo = test.getProp('prop1');
    console.log('pippo', pippo);

    test.set('prop2', 'testtttt', false);
    await test.emitAsync('prop2');
    console.log('after async');
};
