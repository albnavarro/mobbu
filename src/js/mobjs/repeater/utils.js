// @ts-check

import { getElementById } from '../componentStore/action/element';

/**
 * @param {Array} current
 * @param {Array} previous
 * @param {string} key
 * @return {Array}
 *
 *
 * @description
 * Get new element of current array compare to previous.
 */
export const getNewElement = (current = [], previous = [], key = '') => {
    return current.filter((el) => {
        const value = el?.[key];
        return !previous.some((a) => a?.[key] === value);
    });
};

/**
 * @param {array} current
 * @param {array} previous
 * @param {string} key
 * @return {Array.<{isNewElement: boolean, key:string, index:number}>}
 *
 * @description
 * Mix previous and current data to manage the insertion of new component
 * in right position.
 */
export const mixPreviousAndCurrentData = (current, previous, key) => {
    return current.map((el, index) => {
        const value = el?.[key];
        const isNewElement = !previous.some((a) => a?.[key] === value);
        return isNewElement
            ? { isNewElement: true, key: el?.[key], index }
            : { isNewElement: false, key: el?.[key], index };
    });
};

/**
 * @param {object} obj
 * @param {array} obj.arr
 * @param {string} obj.key
 * @return {boolean}
 *
 * @description
 * Check if all new item in list has key.
 */
const arrayhaskey = ({ arr = [], key = '' }) => {
    return arr.every((/** @type {object} */ item) => {
        return item?.[key];
    });
};

/**
 * @param {object} obj
 * @param {array} obj.current
 * @param {array} obj.previous
 * @param {string} obj.key
 * @return {boolean}
 *
 * @description
 * Check if current and previous array has key.
 */
export const listKeyExist = ({ current, previous, key }) => {
    return (
        arrayhaskey({ arr: current, key }) &&
        arrayhaskey({ arr: previous, key })
    );
};

/**
 * @param {object} obj
 * @param {array} obj.data
 * @param {string} obj.key
 * @return {array}
 *
 * @description
 * Get univique array by key.
 */
export const getUnivoqueByKey = ({ data = [], key = '' }) => {
    return data.filter(
        (v, i, a) => a.findIndex((v2) => v2?.[key] === v?.[key]) === i
    );
};

/**
 * @param {object} obj
 * @param {string} obj.component
 * @param {(arg0: string)=> string[]} obj.getChildren
 * @param {HTMLElement} obj.element
 *
 * @return {Array.<string>}
 *
 * @description
 * Get children of component inside a element
 */
export const getChildrenInsideElement = ({
    component,
    getChildren,
    element,
}) => {
    const children = getChildren(component);
    if (!children || !element) return [];

    return [...children].filter((id) => {
        const child = getElementById({ id }) ?? null;
        return element.contains(child);
    });
};
