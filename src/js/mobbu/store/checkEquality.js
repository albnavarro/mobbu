// @ts-check

import { ARRAY, MAP, SET, TYPE_IS_ANY } from './storeType';

/**
 * @param {Map} m1
 * @param {Map} m2
 * @returns {Boolean}
 */
const mapsAreEqual = (m1, m2) =>
    m1.size === m2.size &&
    Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key));

/**
 * @param {Set} a
 * @param {Set} b
 * @returns {Boolean}
 */
const setsAreEqual = (a, b) =>
    a.size === b.size && [...a].every((value) => b.has(value));

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Boolean}
 *
 * @description
 * A function to compare if two arrays have the same elements regardless of their order
 */
const arrayAreEquals = (a, b) => {
    if (a.length !== b.length) return false;
    const elements = new Set([...a, ...b]);
    for (const x of elements) {
        const count1 = a.filter((e) => e === x).length;
        const count2 = b.filter((e) => e === x).length;
        if (count1 !== count2) return false;
    }
    return true;
};

/**
 * @param {any} type
 * @param {any} oldValue
 * @param {any} newValue
 * @returns {Boolean}
 *
 * @description
 */
export const checkEquality = (type, oldValue, newValue) => {
    switch (type) {
        case TYPE_IS_ANY:
            return JSON.stringify(oldValue) === JSON.stringify(newValue);

        case ARRAY:
        case Array:
            return arrayAreEquals(oldValue, newValue);

        case SET:
        case Set:
            return setsAreEqual(oldValue, newValue);

        case MAP:
        case Map:
            return mapsAreEqual(oldValue, newValue);

        default:
            return oldValue === newValue;
    }
};
