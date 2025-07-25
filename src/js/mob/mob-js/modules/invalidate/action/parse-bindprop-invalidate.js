import { MobCore } from '../../../../mob-core';
import { detectProp } from '../../../utils';

/**
 * @param {string | string[] | (() => any)[] | (() => any) | undefined} observeProp
 * @returns {string[]}
 */
export const parseObserveInvalidate = (observeProp) => {
    const observeArray = MobCore.checkType(Array, observeProp)
        ? observeProp
        : [observeProp];

    // @ts-expect-error bindArray is forced to be an array.
    return observeArray.map((item) => {
        return detectProp(item);
    });
};
