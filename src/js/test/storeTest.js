// @ts-check

import { core } from '../mobbu';

export const storeTest = () => {
    setTimeout(() => {
        const storeTest = core.createStore({
            mySecondProp: 0,
            myObj: {
                test: () => ({
                    value: { test: 1, p: { test2: { u: 4 } } },
                    type: 'Any',
                    skipEqual: true,
                    validate: (value) => value === 1,
                    strict: false,
                }),
                pippo: () => ({
                    value: 0,
                    type: Number,
                    skipEqual: true,
                    validate: (value) => value === 1,
                    strict: false,
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
                validate: (value) => value === 1,
            }),
            simpleObj2: () => ({
                value: 2,
                type: Number,
            }),
        });

        const btn = document.querySelector('.l-header__grid');

        btn?.addEventListener('click', () => {
            storeTest.debugStore();
        });

        storeTest.computed(
            'myComputed',
            ['myObj', 'mySecondProp', 'simpleObj'],
            (myObj, mySecondProp) => {
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

        storeTest.set('myObj', { test: { p: { o: 4 } }, test2: { test2: 4 } });

        setTimeout(() => {
            console.log('1300');
            storeTest.set('myObj', {
                ernesto: { r: 800 },
            });
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

            storeTest.set('simpleObj', { a: 10, b: { u: { pluto: 1000 } } });
            storeTest.set('simpleObj2', 3);
        }, 2300);
    }, 100);
};
