import { getStateFromMainMap } from './store-map.js';
import { checkType, storeType } from './store-type.js';
import { storeDepthWarning } from './store-warining.js';

/**
 * Get depth of Object
 *
 * @param {Object} object
 * @returns {number}
 */
export const maxDepth = (object) => {
    if (!storeType.isObject(object)) return 0;
    const values = Object.values(object);

    if (values.length === 0) return 1;

    return Math.max(...values.map((value) => maxDepth(value))) + 1;
};

/**
 * Get Main Store Object If use a function with validation check if there is a function that return an object: key: ()
 * => ({ value: 0, validate: (val) => ...., ... }),
 *
 * Returns initial props value.
 *
 * @param {import('./type.js').MobStoreParams} data
 * @param {boolean} shouldRecursive - Max 1 level of recurisivity.
 * @returns {Object<string, Object<string, any> | any>}
 */
export const getDataRecursive = (data, shouldRecursive = true) => {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            /**
             * First level value is an object. Recursive step to parse each props of object.
             *
             * - This step set shouldRecursive to false.
             */
            if (storeType.isObject(value) && shouldRecursive) {
                return [key, getDataRecursive(value, false)];
            }

            /**
             * Check if it's a function that return an object.
             *
             * - Complex state has value and ate least validate or type or skipEqual
             */
            if (storeType.isFunction(value)) {
                const functionResult = value();

                /**
                 * Complex data with validate || type || skipEqual
                 */
                if (
                    storeType.isObject(functionResult) &&
                    'value' in functionResult &&
                    ['validate', 'type', 'skipEqual'].some(
                        (prop) => prop in functionResult
                    )
                ) {
                    return [key, functionResult.value];
                }
            }

            /**
             * Simple value
             */
            return [key, value];
        })
    );
};

/**
 * Returns specific object by Prop ( validate, skipequel, etc.. )
 *
 * @param {import('./type.js').MobStoreParams} data
 * @param {string} prop
 * @param {any} fallback
 * @param {boolean} shouldRecursive - Max 1 level of recursivity
 * @returns {Object<string, Object<string, any> | any>}
 */
export const getPropRecursive = (
    data,
    prop,
    fallback,
    shouldRecursive = true
) => {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            /**
             * First level value is an object. Recursive step to parse each props of object.
             *
             * - This step set shouldRecursive to false.
             */
            if (storeType.isObject(value) && shouldRecursive) {
                return [key, getPropRecursive(value, prop, fallback, false)];
            }

            /**
             * Check if it's a function that return an object.
             *
             * - Complex state has value and ate least validate or type or skipEqual
             */
            if (storeType.isFunction(value)) {
                const functionResult = value();

                /**
                 * Complex data with specific key ( validate, skipEqual etc.. )
                 */
                if (
                    storeType.isObject(functionResult) &&
                    'value' in functionResult &&
                    prop in functionResult
                ) {
                    const propParsed = storeType.isString(functionResult[prop])
                        ? functionResult[prop].toUpperCase()
                        : functionResult[prop];
                    return [key, propParsed];
                }
            }

            /**
             * Simple value
             */
            return [key, fallback];
        })
    );
};

/**
 * @param {Object} obj
 * @param {import('./type.js').MobStoreParams} obj.data
 * @param {number} obj.depth
 * @param {string} obj.logStyle
 * @returns {Object<string, Object<string, any> | any>}
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
 * @param {import('./type.js').MobStoreParams} obj.data
 * @param {string} obj.prop
 * @param {number} obj.depth
 * @param {string} obj.logStyle
 * @param {any} obj.fallback
 * @returns {Object<string, Object<string, any> | any>}
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

/**
 * @param {Object} obj
 * @param {any} obj.value
 * @returns {any}
 */
export const cloneValueOrGet = ({ value }) => {
    if (checkType(Map, value)) {
        return new Map(value);
    }

    if (checkType(Set, value)) {
        return new Set(value);
    }

    if (checkType(Object, value)) {
        return { ...value };
    }

    if (checkType(Array, value)) {
        return [...value];
    }

    return value;
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {boolean}
 */
export const checkIfPropIsComputed = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return false;

    const { callBackComputed } = state;

    const isComputed = [...callBackComputed].some(
        ({ prop: currentProp }) => prop === currentProp
    );

    if (isComputed) {
        console.warn(
            `${prop} is used as computed, explicit set is disallowed.`
        );
    }

    return isComputed;
};

export const deepClone = (obj) => {
    if (obj == null) return obj;
    if (typeof obj !== 'object') return obj;

    //  PRIMA i check per tipi speciali
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

    //  DOM check PRIMA di entrare nella logica di oggetti
    if (
        typeof window !== 'undefined' &&
        (obj instanceof Node ||
            obj instanceof NodeList ||
            obj instanceof HTMLCollection)
    ) {
        return obj;
    }

    if (obj instanceof Map || obj instanceof Set) return obj;
    if (typeof obj === 'function') return obj; //  Funzioni preservate

    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item));
    }

    // Plain Object - ultimo
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
};
