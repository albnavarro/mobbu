import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    myProp: () => ({
        value: '',
        type: String,
    }),
    myObj: () => ({
        value: {
            prop: 2,
            prop2: {
                nested: 10,
            },
        },
        type: 'any',
    }),
});

const proxi = myStore.getProxi();

myStore.watch('myProp', (value) => {
    console.log(value);
});

/**
 * Simple propierties
 */
proxi.myProp = 'test value';
proxi.myProp = 'test value 2';
proxi.myProp = 'test value 3';

/**
 * SAFE: override entire object and trigger reactivity.
 */
proxi.myObj = { prop: 3 };

/**
 * SAFE: update object and trigger reactivity.
 */
proxi.myObj = { ...proxi.myObj, prop: 4 }; // right

/**
 * BLOCKED ( generate error ):
 */
proxi.myObj.prop = 10;

/**
 * !! DANGEROUS:
 */
proxi.myObj.prop.subprop = 10;
