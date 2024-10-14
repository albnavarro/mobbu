// @ts-check

import { mobCore } from '../../../mobCore';
import { getRepeaterInnerWrap } from '../../component/action/repeater';

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
        return mobCore.checkType(Object, item) && key in item;
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
 * @param {string[]} obj.children
 * @return {Array<string[]>}
 *
 * @description
 * Group all childrn by wrapper ( or undefined if there is no wrapper )
 */
export const chunkIdsByRepeaterWrapper = ({ children }) => {
    /**
     * @type {Map<HTMLElement|Element|string, string[]>}
     */
    const chunkMap = new Map();

    children.forEach((child) => {
        const elementWrapper = getRepeaterInnerWrap({ id: child });

        if (!elementWrapper) {
            chunkMap.set(mobCore.getUnivoqueId(), [child]);
            return;
        }

        if (chunkMap.has(elementWrapper)) {
            const children = chunkMap.get(elementWrapper);
            chunkMap.set(elementWrapper, [...children, child]);
            return;
        }

        chunkMap.set(elementWrapper, [child]);
    });

    const childrenChunkedByWrapper = [...chunkMap.values()];
    chunkMap.clear();
    return childrenChunkedByWrapper;
};
