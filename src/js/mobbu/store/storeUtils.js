// @ts-check

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
 * @param {import('./simpleStore.js').SimpleStoreType} data
 * @param {Boolean} shouldRecursive - max 1 level of recurisivity.
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
export const getDataRecursive = (data, shouldRecursive = true) => {
    return Object.entries(data).reduce((p, c) => {
        const [key, value] = c;
        const functionResult = storeType.isFunction(value)
            ? /** @type {function} */ (value)()
            : {};

        /**
         * First level value is an object.
         * Recursive function if find an Object.
         */
        if (storeType.isObject(value) && shouldRecursive) {
            return {
                ...p,
                ...{
                    [key]: getDataRecursive(
                        /** @type {import('./simpleStore.js').SimpleStoreType} */ (
                            value
                        ),
                        false
                    ),
                },
            };
        }

        /**
         * Complex data with validate|type|skipEqual.
         */
        if (
            storeType.isFunction(value) &&
            storeType.isObject(functionResult) &&
            'value' in functionResult &&
            ('validate' in functionResult ||
                'type' in functionResult ||
                'skipEqual' in functionResult)
        ) {
            return { ...p, ...{ [key]: functionResult.value } };
        }

        /**
         * Simple value
         */
        return { ...p, ...{ [key]: value } };
    }, {});
};

/**
 * @param {import('./simpleStore.js').SimpleStoreType} data
 * @param {String} prop
 * @param {any} fallback
 * @param {Boolean} shouldRecursive - max 1 level of recursivity
 * @returns {Object<string,(Object<string,any>|any)>}
 *
 * @description
 * Returns specific object by Prop ( validate, skipequel, etc.. )
 */
export const getPropRecursive = (
    data,
    prop,
    fallback,
    shouldRecursive = true
) => {
    return Object.entries(data).reduce((p, c) => {
        const [key, value] = c;
        const functionResult = storeType.isFunction(value)
            ? /** @type{function} */ (value)()
            : {};

        /**
         * First level value is an object.
         * Recursive function if find an Object.
         */
        if (storeType.isObject(value) && shouldRecursive) {
            return {
                ...p,
                ...{
                    [key]: getPropRecursive(
                        /** @type{import('./simpleStore.js').SimpleStoreType} */ (
                            value
                        ),
                        prop,
                        fallback,
                        false
                    ),
                },
            };
        }

        /**
         * Complex data with specific key ( validate, skipequel etc.. )
         */
        if (
            storeType.isFunction(value) &&
            storeType.isObject(functionResult) &&
            'value' in functionResult &&
            prop in functionResult
        ) {
            const propParsed = storeType.isString(functionResult[prop])
                ? functionResult[prop].toUpperCase()
                : functionResult[prop];

            return { ...p, ...{ [key]: propParsed } };
        }

        /**
         * Simple value
         */
        return { ...p, ...{ [key]: fallback } };
    }, {});
};

/**
 * @param {Object} obj
 * @param {import('./simpleStore.js').SimpleStoreType} obj.data
 * @param {Number} obj.depth
 * @param {String} obj.logStyle
 * @returns {Object<string,(Object<string,any>|any)>}
 */
export const inizializeStoreData = ({ data, depth, logStyle }) => {
    if (depth > 2) {
        storeDepthWarning(depth, logStyle);
        return {};
    }

    return getDataRecursive(data);
};

/**
 * @param {Object} obj
 * @param {import('./simpleStore.js').SimpleStoreType} obj.data
 * @param {String} obj.prop
 * @param {Number} obj.depth
 * @param {String} obj.logStyle
 * @param {any} obj.fallback
 * @returns {Object<string,(Object<string,any>|any)>}
 */
export const inizializeSpecificProp = ({
    data,
    prop,
    depth,
    logStyle,
    fallback,
}) => {
    if (depth > 2) {
        storeDepthWarning(depth, logStyle);
        return {};
    }

    return getPropRecursive(data, prop, fallback);
};
