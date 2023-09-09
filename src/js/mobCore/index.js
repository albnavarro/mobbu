import { SimpleStore } from './store/simpleStore.js';
import { checkType, getTypeName } from './store/storeType.js';

/**
 * @typedef {import('./store/simpleStore').SimpleStoreType} MobbuStoreType
 */

export const mobCore = {
    /**
     * @description
     * SimpleStore inizialization.
     * The store accepts single properties or objects
       Each individual property can be initialized with a simple value or via a more complex setup.
       A complex set-up is created through a function that must return an object with the property `value` and at least one of the following properties:
       `type` || `validation` || `skipEqual` || `strict`
     *
      `value`:
       Initial value.

      `type`:
       Supported types:
      `String|Number|Object|Function|Array|Boolean|Element|HTMLElement|Map|Set|NodeList|"Any"`.
       The property will not be updated if it doesn't match, you will have a waring.
       For custom Object use 'Any'.
       Support Contructor || String.
       Es: type: Number || type: 'Number'

       `validation`:
       Validation function to parse value.
       This function will have the current value and old value as input parameter and will return a boolean value.
       The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.

       `strict`:
       If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
       THe default value is `false`.

       `skipEqual`:
       If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
       The default value is `true`.
     *
     *
     * @param {import('./store/simpleStore.js').SimpleStoreType} data
     *
     * @example
     *
     * ```javascript
     *
     * const myStore = mobCore.createStore({
     *     prop1: 0,
     *     prop2: 0
     * });
     *
     * const myStore = mobCore.createStore({
     *     myProp: () => ({
     *         value: 10,
     *         type: Number,
     *         validate: (val, oldVal) => val < 10,
     *         strict: true,
     *         skipEqual: false,
     *     }),
     *     myPropWithObject: () => ({
     *         value: { prop: { prop1: 1}},
     *         type: 'Any',
     *     }),
     *     myObject: {
     *         prop1: () => ({
     *             value: 0,
     *             type: Number,
     *             validate: (val, oldVal) => val < 10,
     *             strict: true,
     *             skipEqual: true,
     *         }),
     *         prop2: () => ({
     *             value: document.createElement('div'),
     *             type: Element,
     *         }),
     *     }
     * });
     *
     *
     *
     * Available methods:
     * myStore.set();
     * myStore.setProp();
     * myStore.setProp();
     * myStore.setObj();
     * myStore.computed();
     * myStore.get();
     * myStore.getProp();
     * myStore.getValidation();
     * myStore.watch();
     * myStore.emit();
     * myStore.emitAsync();
     * myStore.debugStore();
     * myStore.debugValidate();
     * myStore.setStyle();
     * myStore.destroy();
     * ```
     */
    createStore(data = {}) {
        return new SimpleStore(data);
    },

    checkType(type, value) {
        return checkType(type, value);
    },

    getTypeName(type) {
        return getTypeName(type);
    },

    /**
     * @returns {String}
     *
     * @description
     * Generate univoque id
     */
    getUnivoqueId() {
        return `_${Math.random().toString(36).slice(2, 9)}`;
    },
};
