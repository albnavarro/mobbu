// @ts-check

import { mobCore } from '../../../../mobCore';
import { staggerEachWarning } from '../warning';

/**
 * @param {number} each
 * @param {boolean} firstRun
 * @param {import('../callbacks/type').callbackObject<any>[]} arrayToCompare1
 * @param {import('../callbacks/type').callbackObject<any>[]} arrayToCompare2
 */
export const shouldInizializzeStagger = (
    each,
    firstRun,
    arrayToCompare1,
    arrayToCompare2
) => {
    if (!mobCore.checkType(Number, each)) {
        staggerEachWarning();
    }

    return (
        each > 0 &&
        firstRun &&
        (arrayToCompare1.length > 0 || arrayToCompare2.length > 0)
    );
};
