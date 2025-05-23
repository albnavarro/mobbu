import { getTweenFn } from '../tween/tween-config.js';
import { dataTweenValueIsValid } from '../utils/tween-action/tween-validation.js';
import { dataTweenValueIsNotValidWarning } from '../utils/warning.js';

/**
 * @param {Record<string, number | (() => number)>} obj
 * @param {string} ease
 * @returns {{ prop: string; toValue: number | (() => number); ease: () => void }[]}
 */
export const goToSyncUtils = (obj, ease) => {
    return Object.keys(obj).map((item) => {
        if (!dataTweenValueIsValid(obj[item])) {
            dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
            return {
                prop: item,
                toValue: 0,
                ease: getTweenFn(ease),
            };
        }

        return {
            prop: item,
            toValue: obj[item],
            ease: getTweenFn(ease),
        };
    });
};

/**
 * @param {Record<string, number | (() => number)>} obj
 * @param {string} ease
 * @returns {{ prop: string; fromValue: number | (() => number); ease: () => void }[]}
 */
export const goFromSyncUtils = (obj, ease) => {
    return Object.keys(obj).map((item) => {
        if (!dataTweenValueIsValid(obj[item])) {
            dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
            return {
                prop: item,
                fromValue: 0,
                ease: getTweenFn(ease),
            };
        }

        return {
            prop: item,
            fromValue: obj[item],
            ease: getTweenFn(ease),
        };
    });
};

/**
 * @param {Record<string, number | (() => number)>} fromObj
 * @param {Record<string, number | (() => number)>} toObj
 * @param {string} ease
 * @returns {{
 *     prop: string;
 *     fromValue: number | (() => number);
 *     toValue: number | (() => number);
 *     ease: () => void;
 * }[]}
 */
export const goFromToSyncUtils = (fromObj, toObj, ease) => {
    return Object.keys(fromObj).map((item) => {
        if (
            !dataTweenValueIsValid(toObj[item]) ||
            !dataTweenValueIsValid(fromObj[item])
        ) {
            dataTweenValueIsNotValidWarning(
                `${item}: ${toObj[item]} || ${item}: ${fromObj[item]}`
            );
            return {
                prop: item,
                fromValue: 0,
                toValue: 0,
                ease: getTweenFn(ease),
            };
        }

        return {
            prop: item,
            fromValue: fromObj[item],
            toValue: toObj[item],
            ease: getTweenFn(ease),
        };
    });
};
