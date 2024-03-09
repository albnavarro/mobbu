import { mobStore } from '../mobCore/store/MapVersion/index.js';

export const initTestMapStore = () => {
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
    });

    const unsubscribe = test.watch('prop1', (val, old, validate) => {
        console.log('callBackWatcher', val, old, validate);
    });

    // unsubscribe();

    test.set('prop1', 20);
    const { prop1 } = test.get();
    console.log(prop1);

    test.set('prop1', 130);
    const { prop1: prop12 } = test.get();
    console.log(prop12);
};
