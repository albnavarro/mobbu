// @ts-check

import {
    getParallaxPositionFromContanst,
    getStartEndUnitMisure,
} from './getConstantFromRegex.js';
import {
    exactMatchInsensitive,
    exactMatchInsesitivePropArray,
} from '../utils/regexValidation.js';
import { parallaxConstant } from './parallaxConstant.js';

/**
 * @description
 * Fail return with bad data
 *
 * @returns {import('./utilsType.js').scrollTriggerLimitValues}
 */
const returnWhenFail = () => {
    return {
        numberVal: 0,
        unitMisure: '',
        additionalVal: '',
        position: '',
    };
};

export const parallaxUtils = {
    /**
     * @param {import('./utilsType.js').scrollTriggerIsInviewPort} obj
     *
     * @return { boolean }
     */
    isInViewport({ offset, height, gap, wScrollTop, wHeight }) {
        return (
            offset + height > wScrollTop - gap &&
            offset < wScrollTop + (wHeight + gap)
        );
    },

    /**
     * @param  {array}  values spitted inut value es: 100px +h => ['100px','+height', 'top']
     * @param  {string}  direction
     * @return {import('./utilsType.js').scrollTriggerLimitValues} return object with values or default
     *
     * @description
     * Filter input value with number in value and additonal value
     *
     * @example
     *  { numberVal: '100px', additionalVal: '+height', position:"top" }
     *  default:  { numberVal: '0', additionalVal: '', position:"bottom" }
     */
    getStartEndValue(values, direction) {
        // Get number value if exist, check values array to find a item wih almost 1 number ad get it
        const numberInString = values.find((item) => {
            return [...item].some((c) => !Number.isNaN(Number.parseFloat(c)));
        });

        // Get unit misure from nunmber case insensitive
        const unitMisure = getStartEndUnitMisure(numberInString);

        // Number without unit misure is not allowed
        if (numberInString && !unitMisure) {
            console.warn(
                'parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horzontal or px'
            );
            return returnWhenFail();
        }

        // Number in vh is not allowed in horizontal mode
        if (
            numberInString &&
            unitMisure === parallaxConstant.VH &&
            direction === parallaxConstant.DIRECTION_HORIZONTAL
        ) {
            console.warn(
                'parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px'
            );
            return returnWhenFail();
        }

        // Number in vw is not allowed in vertical mode
        if (
            numberInString &&
            unitMisure === parallaxConstant.VW &&
            direction === parallaxConstant.DIRECTION_VERTICAL
        ) {
            console.warn(
                'parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px'
            );
            return returnWhenFail();
        }

        // Get aditonal value +height +halfHeight -height -etc... if exist
        const additionaChoice = [
            parallaxConstant.PLUS_HEIGHT,
            parallaxConstant.PLUS_HEIGHT_HALF,
            parallaxConstant.PLUS_WIDTH,
            parallaxConstant.PLUS_WIDTH_HALF,
            parallaxConstant.MINUS_HEIGHT,
            parallaxConstant.MINUS_HEIGHT_HALF,
            parallaxConstant.MINUS_WIDTH,
            parallaxConstant.MINUS_WIDTH_HALF,
        ];
        const getAdditionalVal = values.find((item) => {
            return exactMatchInsesitivePropArray(additionaChoice, item);
        });

        // Get position top || bottom || left || right
        const positionMap = [
            parallaxConstant.POSITION_BOTTOM,
            parallaxConstant.POSITION_TOP,
            parallaxConstant.POSITION_LEFT,
            parallaxConstant.POSITION_RIGHT,
        ];
        const getPosition = values.find((item) => {
            return exactMatchInsesitivePropArray(positionMap, item);
        });

        return {
            numberVal: numberInString || 0,
            unitMisure,
            additionalVal: getAdditionalVal ?? '',
            position: getPosition ?? parallaxConstant.POSITION_BOTTOM,
        };
    },

    /**
     * @description
     * Get start point withuot addition value
     *
     * @param {number} screenUnit
     * @param {string} data
     * @param {string} direction
     *
     * @returns {import('./utilsType.js').scrollTriggerStartEndPartials}
     *
     */
    getStartPoint(screenUnit, data, direction) {
        /**
         * Split into chunk data
         */
        const str = String(data);
        const values = str.split(' ');

        /**
         * Process splitted array
         */
        const { numberVal, unitMisure, additionalVal, position } =
            parallaxUtils.getStartEndValue(values, direction);

        /**
         * Check if number is negative
         */
        const firstChar = String(numberVal).charAt(0);
        const isNegative = firstChar === '-' ? -1 : 1;

        /**
         * Get number withot px or vw etc..
         */
        const number = Number.parseFloat(
            // @ts-ignore
            String(numberVal).replaceAll(/^\D+/g, '')
        );
        const startValInNumber = number ?? 0;

        /**
         * Get final value without height/halfHeight etc..
         */
        return unitMisure === parallaxConstant.PX
            ? {
                  value: startValInNumber * isNegative,
                  additionalVal,
                  position: getParallaxPositionFromContanst(position),
              }
            : {
                  value: screenUnit * startValInNumber * isNegative,
                  additionalVal,
                  position: getParallaxPositionFromContanst(position),
              };
    },

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
     * @returns {import('./utilsType.js').scrollTriggerStartEndPartials}
     *
     */
    getEndPoint(
        screenUnit,
        data,
        startPoint,
        scrollerHeight,
        invertSide,
        direction
    ) {
        /**
         * Split into chunk data
         */
        const str = String(data);
        const values = str.split(' ');

        /**
         * Process splitted array
         */
        const { numberVal, unitMisure, additionalVal, position } =
            parallaxUtils.getStartEndValue(values, direction);

        /**
         * Check if number is negative
         */
        const firstChar = String(numberVal).charAt(0);
        const isNegative = firstChar === '-' ? -1 : 1;

        /**
         * Get number withot px or vw etc..
         */
        const number = Number.parseFloat(
            // @ts-ignore
            String(numberVal).replaceAll(/^\D+/g, '')
        );
        const endValInNumber = number ?? 0;

        /**
         * Get position constant from prallax constant
         */
        const positionFromConstant = getParallaxPositionFromContanst(position);

        /**
         * Check direction
         */
        const isFromTopLeft =
            positionFromConstant === parallaxConstant.POSITION_TOP ||
            positionFromConstant === parallaxConstant.POSITION_LEFT;

        /**
         * Get px value to add (es: top +100px)
         */
        const getValueInPx = (invert = false) => {
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
         * Get vw/vh value to add (es: top +50vh)
         */
        const getValueInVwVh = (invert = false) => {
            if (invert) {
                return isFromTopLeft
                    ? scrollerHeight -
                          screenUnit * (100 - endValInNumber * isNegative) -
                          startPoint
                    : screenUnit * (100 - endValInNumber * isNegative) -
                          startPoint;
            } else {
                return isFromTopLeft
                    ? scrollerHeight -
                          screenUnit * endValInNumber * isNegative -
                          startPoint
                    : screenUnit * endValInNumber * isNegative - startPoint;
            }
        };

        /**
         * Get final value without height/halfHeight etc..
         */
        return unitMisure === parallaxConstant.PX
            ? {
                  value: invertSide ? getValueInPx(true) : getValueInPx(),
                  additionalVal,
                  position: positionFromConstant,
              }
            : {
                  value: invertSide ? getValueInVwVh(true) : getValueInVwVh(),
                  additionalVal,
                  position: positionFromConstant,
              };
    },

    /**
     * @param {number} value
     * @param {string} stringValue
     * @param {number} height
     * @param {number} width
     *
     * @returns {number}
     *
     */
    processFixedLimit(value, stringValue, height, width) {
        const str = String(stringValue);

        // plus
        if (exactMatchInsensitive(str, parallaxConstant.PLUS_HEIGHT_HALF)) {
            return value + height / 2;
        }

        if (exactMatchInsensitive(str, parallaxConstant.PLUS_HEIGHT)) {
            return value + height;
        }

        if (exactMatchInsensitive(str, parallaxConstant.PLUS_WIDTH_HALF)) {
            return value + width / 2;
        }

        if (exactMatchInsensitive(str, parallaxConstant.PLUS_WIDTH)) {
            return value + width;
        }

        // minus
        if (exactMatchInsensitive(str, parallaxConstant.MINUS_HEIGHT_HALF)) {
            return value - height / 2;
        }

        if (exactMatchInsensitive(str, parallaxConstant.MINUS_HEIGHT)) {
            return value - height;
        }

        if (exactMatchInsensitive(str, parallaxConstant.MINUS_WIDTH_HALF)) {
            return value - width / 2;
        }

        if (exactMatchInsensitive(str, parallaxConstant.MINUS_WIDTH)) {
            return value - width;
        }

        return value;
    },

    /**
     * @param {object} obj
     * @param {string} obj.switchPropierties
     * @param {boolean} obj.isReverse
     * @param {number} obj.value
     *
     * @returns {number}
     *
     */
    getValueOnSwitch({ switchPropierties, isReverse, value }) {
        switch (switchPropierties) {
            case parallaxConstant.IN_STOP: {
                return (!isReverse && value > 0) || (isReverse && value < 0)
                    ? 0
                    : value;
            }

            case parallaxConstant.IN_BACK: {
                return (!isReverse && value > 0) || (isReverse && value < 0)
                    ? -value
                    : value;
            }

            case parallaxConstant.OUT_STOP: {
                return (!isReverse && value < 0) || (isReverse && value > 0)
                    ? 0
                    : value;
            }

            case parallaxConstant.OUT_BACK: {
                return (!isReverse && value < 0) || (isReverse && value > 0)
                    ? -value
                    : value;
            }

            default: {
                return value;
            }
        }
    },

    /**
     * @param {string} propierties
     * @param {number} val
     *
     * @returns {number}
     *
     */
    getRetReverseValue(propierties, val) {
        switch (propierties) {
            case parallaxConstant.PROP_OPACITY: {
                return 1 - val;
            }

            default: {
                return -val;
            }
        }
    },
};
