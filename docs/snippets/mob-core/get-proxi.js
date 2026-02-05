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
 * DAGEROUS ( mutate nested prop ): update myObj.prop directly in store reference
 *
 * - No reactivity will trigger.
 * - No validation, typecheck etc.. is trigger.
 *
 * Use: myStore.emit(() => proxi.myObject) to trigger reactivity.
 */
proxi.myObj.prop = 10;
myStore.emit(() => proxi.myObject);
