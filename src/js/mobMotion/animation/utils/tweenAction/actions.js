// @ts-check

import { MobCore } from '../../../../mobCore/index.js';
import { dataTweenValueIsValid } from './tweenValidation.js';
import { dataTweenValueIsNotValidWarning } from '../warning.js';

/**
 * @param {Record<string, number | (() => number)>} obj
 * @returns {import('./type.js').GoToParamsType[]}
 *
 * @description
 * Set goTo value, used by spring and lerp
 */
export const goToUtils = (obj) => {
    return Object.keys(obj).map((item) => {
        if (!dataTweenValueIsValid(obj[item])) {
            dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);

            return {
                prop: item,
                toValue: 0,
                toFn: () => 0,
                toIsFn: false,
                settled: false,
            };
        }

        const toValue = MobCore.checkType(Number, obj[item])
            ? obj[item]
            : // @ts-ignore
              (obj[item]?.() ?? 0);

        return {
            prop: item,
            toValue,
            toFn: /** @type{() => number} */ (obj[item]),
            toIsFn: MobCore.checkType(Function, obj[item]),
            settled: false,
        };
    });
};

/**
 * @param {Record<string, number | (() => number)>} obj
 * @return {import('./type.js').GoFromType[]}
 *
 * @description
 * Set goFrom value, used by spring and lerp
 */
export const goFromUtils = (obj) => {
    return Object.keys(obj).map((item) => {
        if (!dataTweenValueIsValid(obj[item])) {
            dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);

            return {
                prop: item,
                fromValue: 0,
                currentValue: 0,
                fromFn: () => 0,
                fromIsFn: false,
                settled: false,
            };
        }
        const value = MobCore.checkType(Number, obj[item])
            ? obj[item]
            : // @ts-ignore
              (obj[item]?.() ?? 0);

        return {
            prop: item,
            fromValue: value,
            currentValue: value,
            fromFn: /** @type{() => number} */ (obj[item]),
            fromIsFn: MobCore.checkType(Function, obj[item]),
            settled: false,
        };
    });
};

/**
 *
 * @param {Record<string, number | (() => number)>} fromObj
 * @param {Record<string, number | (() => number)>} toObj
 * @return {import('./type.js').GoFromToType[]}
 *
 * @description
 * Set goFromTo value, used by spring and lerp
 */
export const goFromToUtils = (fromObj, toObj) => {
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
                fromFn: () => 0,
                fromIsFn: false,
                currentValue: 0,
                toValue: 0,
                toFn: () => 0,
                toIsFn: false,
                settled: false,
            };
        }

        const fromValue = MobCore.checkType(Number, fromObj[item])
            ? fromObj[item]
            : // @ts-ignore
              (fromObj[item]?.() ?? 0);

        const toValue = MobCore.checkType(Number, toObj[item])
            ? toObj[item]
            : // @ts-ignore
              (toObj[item]?.() ?? 0);

        return {
            prop: item,
            fromValue,
            fromFn: /** @type{() => number} */ (fromObj[item]),
            fromIsFn: MobCore.checkType(Function, fromObj[item]),
            currentValue: fromValue,
            toValue,
            toFn: /** @type{() => number} */ (toObj[item]),
            toIsFn: MobCore.checkType(Function, toObj[item]),
            settled: false,
        };
    });
};

/**
 * @param {Record<string, number | (() => number)>} obj
 * @returns {import('./type.js').GoFromToType[]}
 *
 * @description
 * Set set value, used by spring and lerp
 */
export const setUtils = (obj) => {
    return Object.keys(obj).map((item) => {
        if (!dataTweenValueIsValid(obj[item])) {
            dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);

            return {
                prop: item,
                fromValue: 0,
                fromFn: () => 0,
                fromIsFn: false,
                currentValue: 0,
                toValue: 0,
                toFn: () => 0,
                toIsFn: false,
                settled: false,
            };
        }
        const value = MobCore.checkType(Number, obj[item])
            ? obj[item]
            : // @ts-ignore
              (obj[item]?.() ?? 0);

        return {
            prop: item,
            fromValue: value,
            fromFn: /** @type{() => number} */ (obj[item]),
            fromIsFn: MobCore.checkType(Function, obj[item]),
            currentValue: value,
            toValue: value,
            toFn: /** @type{() => number} */ (obj[item]),
            toIsFn: MobCore.checkType(Function, obj[item]),
            settled: false,
        };
    });
};
