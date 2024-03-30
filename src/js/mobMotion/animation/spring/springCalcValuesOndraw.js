// @ts-check

import { getRoundedValue } from '../utils/animationUtils';

/**
 * @param {Object} param
 * @param {import('./type').springValues[]} param.values
 * @param {number} param.tension
 * @param {number} param.friction
 * @param {number} param.mass
 * @param {number} param.precision
 * @param {number} param.fps
 * @return {import('./type').springValues[]}
 */
export const springCalcValuesOndraw = ({
    values,
    tension,
    friction,
    mass,
    precision,
    fps,
}) => {
    return values.map((item) => {
        const { currentValue, toValue, velocity } = item;
        const tensionForce = -tension * (currentValue - toValue);
        const dampingForce = -friction * velocity;
        const acceleration = (tensionForce + dampingForce) / mass;

        // New values.
        const newVelocity = velocity + (acceleration * 1) / fps;
        const rawCurrentValue = currentValue + (newVelocity * 1) / fps;
        const newCurrentValue = getRoundedValue(rawCurrentValue);

        const isVelocity = Math.abs(newVelocity) <= 0.1;
        const isDisplacement =
            tension === 0
                ? true
                : Math.abs(toValue - Math.round(newCurrentValue * 1e2) / 1e2) <=
                  precision;

        const settled = isVelocity && isDisplacement;

        if (settled) {
            return {
                ...item,
                currentValue: toValue,
                velocity: newVelocity,
                settled: true,
            };
        }

        return {
            ...item,
            currentValue: newCurrentValue,
            velocity: newVelocity,
            settled: false,
        };
    });
};
