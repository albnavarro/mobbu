// @ts-check
//
import { storeType } from './storeType.js';
import { storeDepthWarning } from './storeWarining.js';

/**
 * @param {Object} object
 * @returns {Number}
 *
 * @description Get depth of Object
 */
export const maxDepth = (object) => {
    if (!storeType.isObject(object)) return 0;
    const values = Object.values(object);

    return (
        (values.length && Math.max(...values.map((value) => maxDepth(value)))) +
        1
    );
};

/**
 * @param {Object<string,(Object<string,any>|function({value:any,type:any,validate:function(any):Boolean,strict:Boolean,skipEqual:Boolean}):void|any)>} data
 * @returns {Object<string,(Object<string,any>|any)>}
 *
 * @description
 * Get Main Store Object
 * If use a function with validation check if there is a function that return an object:
 * key: () => ({
 *   value: 0,
 *   validate: (val) => ....,
 *   ...
 * }),
 *
 * Returns initial props value.
 */
export const getDataRecursive = (data) => {
    return Object.entries(data).reduce((p, c) => {
        const [key, value] = c;
        const functionResult = storeType.isFunction(value)
            ? /** @type {function} */ (value)()
            : {};

        if (storeType.isObject(value)) {
            // Recursive function if find an Object
            return {
                ...p,
                ...{ [key]: getDataRecursive(/** @type {Object} */ (value)) },
            };
        } else if (
            storeType.isFunction(value) &&
            storeType.isObject(functionResult) &&
            'value' in functionResult &&
            ('validate' in functionResult ||
                'type' in functionResult ||
                'skipEqual' in functionResult)
        ) {
            return { ...p, ...{ [key]: functionResult.value } };
        } else {
            return { ...p, ...{ [key]: value } };
        }
    }, {});
};

export const getPropRecursive = (data, prop, fallback) => {
    return Object.entries(data).reduce((p, c) => {
        const [key, value] = c;
        const functionResult = storeType.isFunction(value) ? value() : {};

        if (storeType.isObject(value)) {
            // Recursive function if find an Object
            return {
                ...p,
                ...{ [key]: getPropRecursive(value, prop, fallback) },
            };
        } else if (
            storeType.isFunction(value) &&
            storeType.isObject(functionResult) &&
            'value' in functionResult &&
            prop in functionResult
        ) {
            return { ...p, ...{ [key]: functionResult[prop] } };
        } else {
            return { ...p, ...{ [key]: fallback } };
        }
    }, {});
};

/**
 * @param {Object} obj
 * @param {Object<string,(Object<string,any>|function({value:any,type:any,validate:function(any):Boolean,strict:Boolean,skipEqual:Boolean}):void|any)>} obj.data
 * @param {Number} obj.depth
 * @param {String} obj.logStyle
 * @returns {Object<string,(Object<string,any>|any)>}
 */
export const inizializeStoreData = ({ data, depth, logStyle }) => {
    if (depth > 2) {
        storeDepthWarning(depth, logStyle);
        return {};
    } else {
        return getDataRecursive(data);
    }
};
