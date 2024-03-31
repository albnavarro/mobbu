// @ts-check

import { mobCore } from '../../../mobCore';
import { getRoundedValue } from '../utils/animationUtils';
import { checkIsLastUsableProp } from './reduceFunction';

/**
 * @param {Object} param
 * @param {import("./type").sequencerRow[]} param.timeline
 * @param {import("./type").sequencerValue[]} param.valuesState
 * @param {number} param.partial
 * @return {import("./type").sequencerValue[]}
 */
export const sequencerGetValusOnDraw = ({ timeline, valuesState, partial }) => {
    /**
     * @type {import('./type').sequencerValue[]}
     */
    return valuesState.map((valueItem) => {
        /**
         * @type {{toValue:(number|function), fromValue:(number|function), start:number, end:number, ease:function}|{}}
         */
        const item = timeline.reduce(
            (previous, { start, end, values }, index) => {
                /**
                 * Find current valueState item in current timeline node.
                 */
                const currentValuesItem = values.find(
                    ({ prop }) => prop === valueItem.prop
                );

                if (!currentValuesItem || Object.keys(previous).length > 0)
                    return previous;

                const { prop, active, toValue, fromValue, ease } =
                    currentValuesItem;

                /**
                 * Check if in the next step of timeline the same prop is active an start before partial
                 */
                const isLastUsableProp = checkIsLastUsableProp(
                    timeline,
                    index,
                    prop,
                    partial
                );

                /**
                 * Id the prop is settled or is inactive skip
                 * Check if in the next step of timeline the same prop is active an start before partial
                 */
                if (valueItem.settled || !active || !isLastUsableProp)
                    return previous;

                return {
                    toValue,
                    fromValue,
                    start,
                    end,
                    ease,
                };
            },
            {}
        );

        /**
         * Prop not found
         */
        if (Object.keys(item).length === 0) return valueItem;

        // @ts-ignore
        const { start, end, toValue, fromValue, ease } = item;

        const newToValue = mobCore.checkType(Number, toValue)
            ? toValue
            : // @ts-ignore
              toValue();

        const newFromValue = mobCore.checkType(Number, fromValue)
            ? fromValue
            : // @ts-ignore
              fromValue();

        /**
         * At least we get the current value
         */
        const duration = end - start;
        const inactivePosition = partial < end ? newFromValue : newToValue;

        const newCurrentValue =
            partial >= start && partial <= end
                ? ease(
                      partial - start,
                      newFromValue,
                      newToValue - newFromValue,
                      duration
                  )
                : inactivePosition;

        const currentValueRoudned = getRoundedValue(newCurrentValue);

        return {
            ...valueItem,
            currentValue: currentValueRoudned,
            settled: true,
        };
    });
};
