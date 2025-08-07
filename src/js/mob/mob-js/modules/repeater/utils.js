// @ts-check

import { MobCore } from '../../../mob-core';
import { getRepeaterStateById } from '../../component/action/repeater';

/**
 * Get new element of current array compare to previous.
 *
 * @param {any[]} current
 * @param {any[]} previous
 * @param {string} key
 * @returns {any[]}
 */
export const getItemToRemoveByKey = (current = [], previous = [], key = '') => {
    return current.filter((el) => {
        const value = el?.[key];
        return !previous.some((a) => a?.[key] === value);
    });
};

/**
 * Mix previous and current data to manage the insertion of new component in right position.
 *
 * @param {any[]} current
 * @param {any[]} previous
 * @param {string} key
 * @returns {{ isNewElement: boolean; keyValue: string; index: number }[]}
 */
export const mixPreviousAndCurrentData = (current, previous, key) => {
    return current.map((el, index) => {
        const value = el?.[key];
        const isNewElement = !previous.some((a) => a?.[key] === value);
        return isNewElement
            ? { isNewElement: true, keyValue: el?.[key], index }
            : { isNewElement: false, keyValue: el?.[key], index };
    });
};

/**
 * Check if all new item in list has key.
 *
 * @param {object} obj
 * @param {any[]} obj.arr
 * @param {string} obj.key
 * @returns {boolean}
 */
const arrayhaskey = ({ arr = [], key = '' }) => {
    return arr.every((/** @type {object} */ item) => {
        return MobCore.checkType(Object, item) && key in item;
    });
};

/**
 * Check if current and previous array has key.
 *
 * @param {object} obj
 * @param {any[]} obj.current
 * @param {any[]} obj.previous
 * @param {string} obj.key
 * @returns {boolean}
 */
export const listKeyExist = ({ current, previous, key }) => {
    return (
        arrayhaskey({ arr: current, key }) &&
        arrayhaskey({ arr: previous, key })
    );
};

/**
 * Get univique array by key.
 *
 * @param {object} obj
 * @param {any[]} obj.data
 * @param {string | undefined} obj.key
 * @returns {Record<string, any>[]}
 */
export const getUnivoqueByKey = ({ data = [], key = '' }) => {
    return data.filter(
        (v, i, a) => a.findIndex((v2) => v2?.[key] === v?.[key]) === i
    );
};

/**
 * Group component inside single repeat node
 *
 * @param {object} obj
 * @param {string[]} obj.children
 * @param {string[]} [obj.previousChildren]
 * @returns {string[][]}
 */
export const chunkIdsByCurrentValue = ({ children, previousChildren = [] }) => {
    /** @type {Record<string, any>} */
    const initialState = {};

    return previousChildren.length === 0
        ? Object.values(
              /**
               * Chunk children by currentValue ( index ) from a previous empty array.
               */
              children.reduce((previous, current) => {
                  const { index } = getRepeaterStateById({ id: current });

                  if (index in previous) {
                      return {
                          ...previous,
                          [index]: [...previous[index], current],
                      };
                  }

                  return { ...previous, [index]: [current] };
              }, initialState)
          )
        : Object.values(
              /**
               * New elements has the same index of persistent element.
               *
               * The currentValue values of each component at this point have not yet been updated, so new index values
               * collide with previous ones (persistent elements).
               *
               * Mark new index element with `_<index>` char so we have a new group of component for new repeat node.
               *
               * `_<index>` has only internal use state, the function return string[][], the scope of `_<index>` is only
               * create a new group.
               */
              children.reduce((previous, current) => {
                  const { index } = getRepeaterStateById({ id: current });

                  const indexParsed = previousChildren.includes(current)
                      ? `${index}`
                      : `_${index}`;

                  const values = previous?.[indexParsed];

                  if (values) {
                      return {
                          ...previous,
                          [indexParsed]: [...values, current],
                      };
                  }

                  return { ...previous, [indexParsed]: [current] };
              }, initialState)
          );
};
