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
        myObject: {
            prop1: () => ({
                value: 1,
                type: Number,
                validate: (val) => {
                    return val < 10;
                },
                skipEqual: true,
                // strict: true,
            }),
            prop2: () => ({
                value: 3,
                type: 'any',
            }),
        },
    });

    test.computed('computedProp', ['prop1', 'prop2'], (prop1, prop2) => {
        return `${prop1}_${prop2}`;
    });

    const unsubscribe0 = test.watch('computedProp', (val, old, validate) => {
        console.log('computedProp', val, old, validate);
    });

    const unsubscribe = test.watch('prop1', (val, old, validate) => {
        console.log('sync', val, old, validate);
    });

    const unsubscribe2 = test.watch('prop2', async (val, old, validate) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('async', val, old, validate);
                test.set('prop1', 330);
                resolve();
            }, 2000);
        });
    });

    const unsubscribe3 = test.watch('myObject', (val, old, validate) => {
        console.log('myObject', val, old, validate);
    });

    // unsubscribe0();
    // unsubscribe();
    // unsubscribe2();

    test.set('prop1', 20);
    const { prop1 } = test.get();
    console.log(prop1);

    test.set('prop1', 130);
    const { prop1: prop12 } = test.get();
    console.log(prop12);

    test.set('prop1', 230);

    test.emit('prop1');
    const pippo = test.getProp('prop1');
    console.log('pippo', pippo);

    test.set('prop2', 'testtttt', false);
    await test.emitAsync('prop2');
    console.log('after async');

    test.set('myObject', { prop1: 100, prop2: 3 });
    test.set('myObject', { prop1: 100, prop2: 3 });
    test.set('myObject', { prop1: 100, prop2: 3 });
    test.set('myObject', { prop1: 100, prop2: 3 });
    test.set('myObject', {
        prop1: 100,
        prop2: { pippo: 3, pluto: { paperino: 100 } },
    });
    const { myObject } = test.get();
    console.log(myObject);
    console.log(test.debugValidate());

    test.quickSetProp('prop1', 3);
    test.quickSetProp('prop1', 30);
    test.quickSetProp('prop1', 130);
};
