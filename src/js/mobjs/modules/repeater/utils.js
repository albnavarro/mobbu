// @ts-check

import { mobCore } from '../../../mobCore';
import { getChildrenById } from '../../component/action/children';
import { getRepeaterInnerWrap } from '../../component/action/repeater';

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

    /**
     * Check firs chunk elementWrapper.
     * All check is equal.
     */
    const hasWrapper = getRepeaterInnerWrap({ id: children[0] });

    /**
     * Group children by elementWrapper
     */
    if (hasWrapper) {
        children.forEach((child) => {
            const elementWrapper = getRepeaterInnerWrap({ id: child });

            if (chunkMap.has(elementWrapper)) {
                const children = chunkMap.get(elementWrapper);
                if (!children) return;

                chunkMap.set(elementWrapper, [...children, child]);
                return;
            }

            chunkMap.set(elementWrapper, [child]);
        });
    }

    /**
     * Group element by relationShip
     */
    if (!hasWrapper) {
        const elementGroupByRelationShip = children
            .map((child) => {
                const childrenAndSelf = [
                    ...getChildrenById({ id: child }),
                    child,
                ];

                /**
                 * Filter result by input children
                 */
                return childrenAndSelf.filter((item) =>
                    children.includes(item)
                );
            })
            // Remove root parent
            .filter((item) => item.length > 1);

        /**
         * Update main chunk Map
         */
        elementGroupByRelationShip.forEach((item) => {
            chunkMap.set(mobCore.getUnivoqueId(), item);
        });
    }

    /**
     * If there is no chunk is a component without child
     * so return a chunk with one element.
     */
    const childrenChunkedByWrapper =
        chunkMap.size === 0
            ? children.map((item) => [item])
            : [...chunkMap.values()];

    chunkMap.clear();
    return childrenChunkedByWrapper;
};
