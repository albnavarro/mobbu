// @ts-check

import { mobCore } from '../../../mobCore';
import { getRepeaterStateById } from '../../component/action/repeater';

/**
 * @param {Array<any>} current
 * @param {Array<any>} previous
 * @param {string} key
 * @return {Array<any>}
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
 * @param {Array<any>} current
 * @param {Array<any>} previous
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
 * @param {Array<any>} obj.arr
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
 * @param {Array<any>} obj.current
 * @param {Array<any>} obj.previous
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
 * @param {Array<any>} obj.data
 * @param {string} obj.key
 * @return {Record<string, any>[]}
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
 * @param {Array<string>} [ obj.previousChildren ]
 * @return {Array<string[]>}
 *
 * @description
 * Group all childrn by wrapper ( or undefined if there is no wrapper )
 */
export const chunkIdsByCurrentValue = ({ children, previousChildren = [] }) => {
    /**
     * @type {Map<number|string, string[]>}
     */
    const chunkMap = new Map();

    /**
     * Chunk children by currentValue clean.
     */
    if (previousChildren.length === 0) {
        children.forEach((child) => {
            const { index } = getRepeaterStateById({ id: child });

            if (chunkMap.has(index)) {
                const values = chunkMap.get(index);
                chunkMap.set(index, [...values, child]);
                return;
            }

            chunkMap.set(index, [child]);
        });

        const result = [...chunkMap.values()];
        chunkMap.clear();

        return result;
    }

    /**
     * New element has the same index of persistent element.
     * Current value of persistent element is not updated.
     * Mark new index element with `_` char
     */
    children.forEach((child) => {
        const { index } = getRepeaterStateById({ id: child });

        const indexParsed = previousChildren.includes(child)
            ? `${index}`
            : `_${index}`;

        const values = chunkMap.get(indexParsed);

        if (values) {
            chunkMap.set(`${indexParsed}`, [...values, child]);
            return;
        }

        chunkMap.set(`${indexParsed}`, [child]);
    });

    const result = [...chunkMap.values()];
    chunkMap.clear();

    return result;
};
