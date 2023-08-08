// @ts-check

import { storeType } from '../../store/storeType.js';
import { dataTweenValueIsValid } from './tweenValidation.js';
import { dataTweenValueIsNotValidWarning } from './warning.js';

/**
 * @param {{ string: number|function():number }} obj
 * @returns {Array<{prop:string,toValue:number,toFn:(function|number),toIsFn:boolean,settled:boolean}>}
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
                toFn: () => {},
                toIsFn: false,
                settled: false,
            };
        }

        const toValue = storeType.isNumber(obj[item]) ? obj[item] : obj[item]();

        return {
            prop: item,
            toValue,
            toFn: obj[item],
            toIsFn: storeType.isFunction(obj[item]),
            settled: false,
        };
    });
};

/**
 * @param {{ string: number|function():number }} obj
 * @returns {Array<{prop:string,fromValue:number,currentValue:number,fromFn:(function|number),fromIsFn:boolean,settled:boolean}>}
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
                fromFn: () => {},
                fromIsFn: false,
                settled: false,
            };
        }
        const value = storeType.isNumber(obj[item]) ? obj[item] : obj[item]();

        return {
            prop: item,
            fromValue: value,
            currentValue: value,
            fromFn: obj[item],
            fromIsFn: storeType.isFunction(obj[item]),
            settled: false,
        };
    });
};

/**
 * @param {{ string: number|function():number }} fromObj
 * @param {{ string: number|function():number }} toObj
 * @returns {Array<{ prop:string, fromValue:number, fromFn:(function|number), fromIsFn:boolean, currentValue:number, toValue:number, toFn:(function|number), toIsFn:boolean, settled:boolean }>}
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
                fromFn: () => {},
                fromIsFn: false,
                currentValue: 0,
                toValue: 0,
                toFn: () => {},
                toIsFn: false,
                settled: false,
            };
        }

        const fromValue = storeType.isNumber(fromObj[item])
            ? fromObj[item]
            : fromObj[item]();

        const toValue = storeType.isNumber(toObj[item])
            ? toObj[item]
            : toObj[item]();

        return {
            prop: item,
            fromValue,
            fromFn: fromObj[item],
            fromIsFn: storeType.isFunction(fromObj[item]),
            currentValue: fromValue,
            toValue,
            toFn: toObj[item],
            toIsFn: storeType.isFunction(toObj[item]),
            settled: false,
        };
    });
};

/**
 * @param {{ string: number|function():number }} obj
 * @returns {Array<{ prop:string, fromValue:number, fromFn:(function|number), fromIsFn:boolean, currentValue:number, toValue:number, toFn:(function|number), toIsFn:boolean, settled:boolean }>}
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
                fromFn: () => {},
                fromIsFn: false,
                currentValue: 0,
                toValue: 0,
                toFn: () => {},
                toIsFn: false,
                settled: false,
            };
        }
        const value = storeType.isNumber(obj[item]) ? obj[item] : obj[item]();

        return {
            prop: item,
            fromValue: value,
            fromFn: obj[item],
            fromIsFn: storeType.isFunction(obj[item]),
            currentValue: value,
            toValue: value,
            toFn: obj[item],
            toIsFn: storeType.isFunction(obj[item]),
            settled: false,
        };
    });
};
