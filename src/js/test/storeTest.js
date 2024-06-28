// @ts-check

import { mobCore } from '../mobCore';

export const storeTest = () => {
    setTimeout(() => {
        const storeTest = mobCore.createStore({
            mySecondProp: 0,
            myObj: {
                test: () => ({
                    value: { test: 1, p: { test2: { u: 4 } } },
                    type: 'Any',
                    skipEqual: true,
                    validate: (value, oldVal) => {
                        console.log('validate');
                        console.log(value, oldVal);
                        return value === 1;
                    },
                    strict: false,
                }),
                pippo: () => ({
                    value: 0,
                    type: Number,
                    skipEqual: true,
                    validate: (value) => value === 1,
                    strict: false,
                }),
                setTest: () => ({
                    value: new Set(),
                    type: Set,
                }),
                test2: () => ({
                    value: { test: 1, p: { test2: { u: 4 } } },
                    type: 'Any',
                    skipEqual: true,
                }),
                ernesto: () => ({
                    value: { pippo: { r: { r: { r: { r: { r: 2 } } } } } },
                    type: 'Any',
                    validate: (obj) => (obj?.pippo ? true : false),
                    strict: true,
                }),
            },
            myComputed: 0,
            simpleObj: () => ({
                value: { a: 0, b: { u: 1 } },
                type: 'Any',
                validate: (value, oldVal) => {
                    console.log('simpleObj validate');
                    console.log(value, oldVal);
                    return value === 1;
                },
            }),
            simpleArray: () => ({
                value: [],
                type: Array,
                skipEqual: true,
            }),
            setTest: () => ({
                value: new Set(),
                type: Set,
                validate: (value, oldValue) => {
                    console.log('set test validate function');
                    console.log(value, oldValue);
                    return value.size === 0;
                },
            }),
            mapTest: () => ({
                value: new Map(),
                type: Map,
            }),
        });

        const btn = document.querySelector('.l-header__grid');

        btn?.addEventListener('click', () => {
            storeTest.debugStore();
        });

        storeTest.computed(
            'myComputed',
            ['myObj', 'mySecondProp', 'simpleObj'],
            ({ myObj, mySecondProp }) => {
                return myObj.pippo + myObj.test2.test2 + mySecondProp;
            }
        );

        storeTest.watch('myObj', (value, oldval, validation) => {
            console.log('------');
            console.log('myObj');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.watch('simpleObj', (value, oldval, validation) => {
            console.log('------');
            console.log('simpleObj');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.watch('myComputed', (value, oldval, validation) => {
            console.log('------');
            console.log('myComputed');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.watch('mapTest', (value, oldval, validation) => {
            console.log('------');
            console.log('mapTest');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.watch('setTest', (value, oldval, validation) => {
            console.log('------');
            console.log('setTest');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.watch('simpleArray', (value, oldval, validation) => {
            console.log('------');
            console.log('simpleArray');
            console.log(value, oldval, validation);
            console.log('------');
        });

        storeTest.set('myObj', { test: { p: { o: 4 } }, test2: { test2: 4 } });

        setTimeout(() => {
            console.log('1300');
            storeTest.set('myObj', {
                ernesto: { pippo: { r: { r: { r: { r: { r: 2 } } } } } },
                pippo: 10,
                setTest: new Set().add(5),
            });

            storeTest.set(
                'setTest',
                (val) => {
                    val.add(1);
                    val.add(5);
                    return val;
                },
                true,
                true
            );

            storeTest.set(
                'mapTest',
                (val) => {
                    val.set('a', 11);
                    val.set('b', 5);
                    return val;
                },
                true,
                true
            );
        }, 1300);

        setTimeout(() => {
            console.log('2300');
            storeTest.set('myObj', {
                test: { p: { o: 4 } },
                test2: { test2: 5 },
                pippo: 50,
            });

            storeTest.set('mySecondProp', 120);

            storeTest.set('myObj', {
                test: { p: { o: { pippo: 'pluto' } } },
                test2: { test2: 4 },
                pippo: 100,
                ernesto: { pippo: 1 },
            });

            // storeTest.set('simpleObj', { a: 1, b: { u: 1 } });
            storeTest.set('simpleObj', (obj) => ({
                ...obj,
                resppp: 1000,
            }));
            storeTest.set('simpleArray', (val) => {
                return [...val];
            });
            storeTest.set('simpleArray', (val) => {
                return [...val, 1];
            });
            storeTest.set(
                'setTest',
                (val) => {
                    val.add(2);
                    val.add(5);
                    return val;
                },
                true,
                true
            );
            storeTest.set(
                'mapTest',
                (val) => {
                    val.set('a', 6);
                    val.set('b', 5);
                    return val;
                },
                true,
                true
            );
        }, 2300);
    }, 100);
};
