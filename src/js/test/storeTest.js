// @ts-check

import { core } from '../mobbu';

export const storeTest = () => {
    setTimeout(() => {
        const storeTest = core.createStore({
            myObj: {
                test: () => ({
                    value: { test: 1, p: { test2: { u: 4 } } },
                    type: 'Object',
                    skipEqual: true,
                }),
                pippo: () => ({
                    value: 0,
                    type: Number,
                    skipEqual: false,
                }),
                test2: () => ({
                    value: { test: 1, p: { test2: { u: 4 } } },
                    type: 'Object',
                    skipEqual: true,
                }),
            },
            mySecondProp: 0,
            myComputed: 0,
        });

        const btn = document.querySelector('.l-header__grid');

        btn?.addEventListener('click', () => {
            storeTest.debugStore();
        });

        storeTest.watch('myObj', (value, oldval) => {
            console.log(value, oldval);
        });

        storeTest.computed(
            'myComputed',
            ['myObj', 'mySecondProp'],
            (myObj, mySecondProp) => {
                console.log('computed', myObj, mySecondProp);
                return myObj.pippo + myObj.test2.test2 + mySecondProp;
            }
        );

        storeTest.set('myObj', { test: { p: { o: 4 } }, test2: { test2: 4 } });

        setTimeout(() => {
            console.log('1300');
            storeTest.set('myObj', {
                test: { p: { o: 4 } },
                test2: { test2: 4 },
                pippo: 0,
            });
        }, 1300);

        setTimeout(() => {
            console.log('2300');
            storeTest.set('myObj', {
                test: { p: { o: 4 } },
                test2: { test2: 4 },
                pippo: 10,
            });

            storeTest.set('mySecondProp', 120);

            storeTest.set('myObj', {
                test: { p: { o: { pippo: 'pluto' } } },
                test2: { test2: 4 },
                pippo: 10,
            });
        }, 2300);
    }, 100);
};
