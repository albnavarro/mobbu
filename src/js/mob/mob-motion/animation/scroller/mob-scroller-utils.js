// @ts-check

import {
    getScrollerPositionFromContanst,
    getStartEndUnitMisure,
} from './get-constant-from-regex.js';
import {
    exactMatchInsensitive,
    exactMatchInsesitivePropArray,
} from '../utils/regex-validation.js';
import { MobScrollerConstant } from './mob-scroller-constant.js';
import {
    scrollerWarningNoUnitMiusure,
    scrollerWarningVhIsNotAllowed,
    scrollerWarningVwIsNotAllowed,
} from './warning.js';
import { MobCore } from '../../../mob-core/index.js';

/**
 * @description
 * Fail return with bad data
 *
 * @returns {import('./utils-type.js').scrollTriggerLimitValues}
 */
const returnWhenFail = () => {
    return {
        numberVal: 0,
        unitMisure: '',
        additionalVal: '',
        position: '',
    };
};

/**
 * @description
 * Get px value to add (es: top +100px)
 *
 * @param {object} obj
 * @param {boolean} obj.invert
 * @param {number} obj.endValInNumber
 * @param {number} obj.scrollerHeight
 * @param {number} obj.isNegative
 * @param {number} obj.startPoint
 * @param {boolean} obj.isFromTopLeft
 *
 * @returns number
 */
const getValueInPx = ({
    invert,
    endValInNumber,
    scrollerHeight,
    isNegative,
    startPoint,
    isFromTopLeft,
}) => {
    const valueFromTop = endValInNumber * isNegative - startPoint;
    const valueFromBottom =
        scrollerHeight - endValInNumber * isNegative - startPoint;

    if (invert) {
        return isFromTopLeft ? valueFromTop : valueFromBottom;
    } else {
        return isFromTopLeft ? valueFromBottom : valueFromTop;
    }
};

/**
 * @description
 * Get vw/vh value to add (es: top +50vh)
 *
 * @param {object} obj
 * @param {boolean} obj.invert
 * @param {number} obj.endValInNumber
 * @param {number} obj.scrollerHeight
 * @param {number} obj.screenUnit
 * @param {number} obj.isNegative
 * @param {number} obj.startPoint
 * @param {boolean} obj.isFromTopLeft
 *
 * @returns number
 */
const getValueInVwVh = ({
    invert,
    scrollerHeight,
    screenUnit,
    endValInNumber,
    isNegative,
    startPoint,
    isFromTopLeft,
}) => {
    if (invert) {
        return isFromTopLeft
            ? scrollerHeight -
                  screenUnit * (100 - endValInNumber * isNegative) -
                  startPoint
            : screenUnit * (100 - endValInNumber * isNegative) - startPoint;
    } else {
        return isFromTopLeft
            ? scrollerHeight -
                  screenUnit * endValInNumber * isNegative -
                  startPoint
            : screenUnit * endValInNumber * isNegative - startPoint;
    }
};

/**
 * @param {import('./utils-type.js').scrollTriggerIsInviewPort} obj
 *
 * @return { boolean }
 */
export const detectViewPortInterception = ({
    offset,
    height,
    gap,
    wScrollTop,
    wHeight,
}) => {
    return (
        offset + height > wScrollTop - gap &&
        offset < wScrollTop + (wHeight + gap)
    );
};

/**
 * @param  {string[]}  values spitted input value es: 100px +h => ['100px','+height', 'top']
 * @param  {string}  direction
 * @return {import('./utils-type.js').scrollTriggerLimitValues} return object with values or default
 *
 * @description
 * Filter input value with number in value and additional value
 *
 * @example
 *  { numberVal: '100px', additionalVal: '+height', position:"top" }
 *  default:  { numberVal: '0', additionalVal: '', position:"bottom" }
 */
export const getStartEndValue = (values, direction) => {
    // Get number value if exist, check values array to find a item with almost 1 number ad get it
    const numberInString = values.find((item) => {
        return [...item].some((c) => !Number.isNaN(Number.parseFloat(c)));
    });

    // Get unit misure from nunmber case insensitive
    const unitMisure = getStartEndUnitMisure(numberInString);

    // Number without unit misure is not allowed
    if (numberInString && !unitMisure) {
        scrollerWarningNoUnitMiusure();
        return returnWhenFail();
    }

    // Number in vh is not allowed in horizontal mode
    if (
        numberInString &&
        unitMisure === MobScrollerConstant.VH &&
        direction === MobScrollerConstant.DIRECTION_HORIZONTAL
    ) {
        scrollerWarningVhIsNotAllowed();
        return returnWhenFail();
    }

    // Number in vw is not allowed in vertical mode
    if (
        numberInString &&
        unitMisure === MobScrollerConstant.VW &&
        direction === MobScrollerConstant.DIRECTION_VERTICAL
    ) {
        scrollerWarningVwIsNotAllowed();
        return returnWhenFail();
    }

    // Get aditonal value +height +halfHeight -height -etc... if exist
    const additionaChoice = [
        MobScrollerConstant.PLUS_HEIGHT,
        MobScrollerConstant.PLUS_HEIGHT_HALF,
        MobScrollerConstant.PLUS_WIDTH,
        MobScrollerConstant.PLUS_WIDTH_HALF,
        MobScrollerConstant.MINUS_HEIGHT,
        MobScrollerConstant.MINUS_HEIGHT_HALF,
        MobScrollerConstant.MINUS_WIDTH,
        MobScrollerConstant.MINUS_WIDTH_HALF,
    ];
    const getAdditionalVal = values.find((item) => {
        return exactMatchInsesitivePropArray(additionaChoice, item);
    });

    // Get position top || bottom || left || right
    const positionMap = [
        MobScrollerConstant.POSITION_BOTTOM,
        MobScrollerConstant.POSITION_TOP,
        MobScrollerConstant.POSITION_LEFT,
        MobScrollerConstant.POSITION_RIGHT,
    ];
    const getPosition = values.find((item) => {
        return exactMatchInsesitivePropArray(positionMap, item);
    });

    return {
        numberVal: numberInString || 0,
        unitMisure,
        additionalVal: getAdditionalVal ?? '',
        position: getPosition ?? MobScrollerConstant.POSITION_BOTTOM,
    };
};

/**
 * @description
 * Get start point withuot addition value
 *
 * @param {number} screenUnit
 * @param {string} data
 * @param {string} direction
 *
 * @returns {import('./utils-type.js').scrollTriggerStartEndPartials}
 *
 */
export const getStartPoint = (screenUnit, data, direction) => {
    /**
     * Split into chunk data
     */
    const str = String(data);
    const values = str.split(' ');

    /**
     * Process split array
     */
    const { numberVal, unitMisure, additionalVal, position } = getStartEndValue(
        values,
        direction
    );

    /**
     * Check if number is negative
     */
    const firstChar = String(numberVal).charAt(0);
    const isNegative = firstChar === '-' ? -1 : 1;

    /**
     * Get number without px or vw etc..
     */
    const number = Number.parseFloat(
        // @ts-ignore
        String(numberVal).replaceAll(/^\D+/g, '')
    );
    const startValInNumber = number ?? 0;

    /**
     * Get final value without height/halfHeight etc..
     */
    return unitMisure === MobScrollerConstant.PX
        ? {
              value: startValInNumber * isNegative,
              additionalVal,
              position: getScrollerPositionFromContanst(position),
          }
        : {
              value: screenUnit * startValInNumber * isNegative,
              additionalVal,
              position: getScrollerPositionFromContanst(position),
          };
};

/**
 * @description
 * Get end point withuot addition value
 *
 * @param {number} screenUnit
 * @param {string} data
 * @param {number} startPoint
 * @param {number} scrollerHeight
 * @param {boolean} invertSide
 * @param {string} direction
 *
 * @returns {import('./utils-type.js').scrollTriggerStartEndPartials}
 *
 */
export const getEndPoint = (
    screenUnit,
    data,
    startPoint,
    scrollerHeight,
    invertSide,
    direction
) => {
    /**
     * Split into chunk data
     */
    const str = String(data);
    const values = str.split(' ');

    /**
     * Process split array
     */
    const { numberVal, unitMisure, additionalVal, position } = getStartEndValue(
        values,
        direction
    );

    /**
     * Check if number is negative
     */
    const firstChar = String(numberVal).charAt(0);
    const isNegative = firstChar === '-' ? -1 : 1;

    /**
     * Get number without px or vw etc..
     */
    const number = Number.parseFloat(
        // @ts-ignore
        String(numberVal).replaceAll(/^\D+/g, '')
    );
    const endValInNumber = number ?? 0;

    /**
     * Get position constant from prallax constant
     */
    const positionFromConstant = getScrollerPositionFromContanst(position);

    /**
     * Check direction
     */
    const isFromTopLeft =
        positionFromConstant === MobScrollerConstant.POSITION_TOP ||
        positionFromConstant === MobScrollerConstant.POSITION_LEFT;

    /**
     * Get final value without height/halfHeight etc..
     */
    return unitMisure === MobScrollerConstant.PX
        ? {
              value: invertSide
                  ? getValueInPx({
                        invert: true,
                        endValInNumber,
                        scrollerHeight,
                        isNegative,
                        startPoint,
                        isFromTopLeft,
                    })
                  : getValueInPx({
                        invert: false,
                        endValInNumber,
                        scrollerHeight,
                        isNegative,
                        startPoint,
                        isFromTopLeft,
                    }),
              additionalVal,
              position: positionFromConstant,
          }
        : {
              value: invertSide
                  ? getValueInVwVh({
                        invert: true,
                        scrollerHeight,
                        screenUnit,
                        endValInNumber,
                        isNegative,
                        startPoint,
                        isFromTopLeft,
                    })
                  : getValueInVwVh({
                        invert: false,
                        scrollerHeight,
                        screenUnit,
                        endValInNumber,
                        isNegative,
                        startPoint,
                        isFromTopLeft,
                    }),
              additionalVal,
              position: positionFromConstant,
          };
};

/**
 * @param {number} value
 * @param {string} stringValue
 * @param {number} height
 * @param {number} width
 *
 * @returns {number}
 *
 */
export const processFixedLimit = (value, stringValue, height, width) => {
    const str = String(stringValue);

    // plus
    if (exactMatchInsensitive(str, MobScrollerConstant.PLUS_HEIGHT_HALF)) {
        return value + height / 2;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.PLUS_HEIGHT)) {
        return value + height;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.PLUS_WIDTH_HALF)) {
        return value + width / 2;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.PLUS_WIDTH)) {
        return value + width;
    }

    // minus
    if (exactMatchInsensitive(str, MobScrollerConstant.MINUS_HEIGHT_HALF)) {
        return value - height / 2;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.MINUS_HEIGHT)) {
        return value - height;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.MINUS_WIDTH_HALF)) {
        return value - width / 2;
    }

    if (exactMatchInsensitive(str, MobScrollerConstant.MINUS_WIDTH)) {
        return value - width;
    }

    return value;
};

/**
 * @param {object} obj
 * @param {string|boolean} obj.switchPropierties
 * @param {boolean} obj.isReverse
 * @param {number} obj.value
 *
 * @returns {number}
 *
 */
export const getValueOnSwitch = ({ switchPropierties, isReverse, value }) => {
    switch (switchPropierties) {
        case MobScrollerConstant.IN_STOP: {
            return (!isReverse && value > 0) || (isReverse && value < 0)
                ? 0
                : value;
        }

        case MobScrollerConstant.IN_BACK: {
            return (!isReverse && value > 0) || (isReverse && value < 0)
                ? -value
                : value;
        }

        case MobScrollerConstant.OUT_STOP: {
            return (!isReverse && value < 0) || (isReverse && value > 0)
                ? 0
                : value;
        }

        case MobScrollerConstant.OUT_BACK: {
            return (!isReverse && value < 0) || (isReverse && value > 0)
                ? -value
                : value;
        }

        default: {
            return value;
        }
    }
};

/**
 * @param {string} propierties
 * @param {number} val
 *
 * @returns {number}
 *
 */
export const getRetReverseValue = (propierties, val) => {
    switch (propierties) {
        case MobScrollerConstant.PROP_OPACITY: {
            return 1 - val;
        }

        default: {
            return -val;
        }
    }
};

/**
 * @param {Object} param
 * @param {import('../../../mob-core/events/scrollUtils/type.js').HandleScrollCallback<import('../../../mob-core/events/scrollUtils/type.js').HandleScroll>} param.callback
 * @param {boolean} param.pin
 * @param {boolean} param.ease
 * @param {boolean} param.useThrottle
 * @returns {() => void}
 */
export const getScrollFunction = ({ callback, pin, ease, useThrottle }) => {
    /**
     * If use pin we have to get fresh value on scroll
     * Otherwise we can optimize and fire scroll callback after requerst animationFrame
     */
    if (pin) return MobCore.useScrollImmediate(callback);

    /**
     * Use throttle if needed and there is a ease;
     */
    if (ease && useThrottle) return MobCore.useScrollThrottle(callback);

    /**
     * Default scroll
     */
    return MobCore.useScroll(callback);
};
