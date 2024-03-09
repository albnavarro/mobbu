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

    test.set('prop1', 20);
    const { prop1 } = test.get();
    console.log(prop1);
    test.set('prop1', 30);
    const { prop1: prop12 } = test.get();
    console.log(prop12);
};
