import { mobStore } from '../mobCore/store/MapVersion/index.js';

export const initTestMapStore = () => {
    const test = mobStore({
        test: () => ({
            value: 30,
            type: Number,
            skipEqual: false,
        }),
    });
    test.get();
    test.set();

    const test2 = mobStore({
        myObject: {
            test: () => ({
                value: 'ffff',
                type: String,
                skipEqual: false,
                strict: true,
                validate: (val) => {
                    val === 'ffff';
                },
            }),
            pippo: 3,
        },
        myObject2: {
            test: () => ({
                value: 'ffff',
                type: String,
                skipEqual: false,
            }),
        },
        pluto: 2,
    });
    test2.get();
    test2.set();
};
