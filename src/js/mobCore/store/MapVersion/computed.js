// @ts-check

import { useNextLoop } from '../../utils/nextTick';
import { getLogStyle } from './logStyle';
import { getFormMainMap, updateMainMap } from './storeMap';
import { storeSetEntryPoint } from './storeSet';
import {
    storeComputedKeyUsedWarning,
    storeComputedWarning,
} from './storeWarining';

/**
 * @param {string} instanceId
 */
const fireComputed = (instanceId) => {
    /**
     * Get fresh data.
     */
    const state = getFormMainMap(instanceId);
    const { computedWaitList, callBackComputed, store, computedPropFired } =
        state;

    computedWaitList.forEach((propChanged) => {
        callBackComputed.forEach((item) => {
            const {
                prop: propToUpdate,
                keys: propsShouldChange,
                fn: computedFn,
            } = item;

            /**
             * I'm getting the list of all the store keys
             */
            const storeKeys = Object.keys(store);

            /**
             * I check that all keys to monitor in computed exist in the store*
             */
            const propsShouldChangeIsInStore = propsShouldChange.every((item) =>
                storeKeys.includes(item)
            );

            /**
             * If one of the keys to monitor does not exist in the store, I interrupt.
             */
            if (!propsShouldChangeIsInStore) {
                storeComputedWarning(
                    propsShouldChange,
                    propToUpdate,
                    getLogStyle()
                );
                return;
            }

            /**
             * I check that the incoming prop is a computed dependency
             * It is the key control that triggers the computed
             */
            const propChangedIsDependency =
                propsShouldChange.includes(propChanged);

            if (!propChangedIsDependency) return;

            /**
             * I take the value of each property given the key
             */
            const propValues = propsShouldChange.map((item) => {
                return store[item];
            });

            /**
             * I generate the value from the callback function to pass to the
             * setters to update the prop
             */

            const shouldFire = !computedPropFired.has(propToUpdate);

            if (shouldFire) {
                const computedValue = computedFn(...propValues);
                storeSetEntryPoint({
                    instanceId,
                    prop: propToUpdate,
                    value: computedValue,
                });
                computedPropFired.add(propToUpdate);
            }
        });
    });

    /**
     * Get last state after new value is settled from computed.
     */
    const stateAfterComputed = getFormMainMap(instanceId);

    /**
     * Update all
     */
    updateMainMap(instanceId, {
        ...stateAfterComputed,
        computedPropFired: new Set(),
        computedWaitList: new Set(),
        computedRunning: false,
    });
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {void}
 */
export const addToComputedWaitLsit = ({ instanceId, prop }) => {
    const state = getFormMainMap(instanceId);
    const { callBackComputed, computedWaitList, computedRunning } = state;

    if (!callBackComputed || callBackComputed.size === 0) return;

    /**
     * Update computedWaitList.
     */
    computedWaitList.add(prop);
    updateMainMap(instanceId, { ...state, computedWaitList });

    if (!computedRunning) {
        const state = getFormMainMap(instanceId);
        updateMainMap(instanceId, { ...state, computedRunning: true });
        useNextLoop(() => fireComputed(instanceId));
    }
};

/**
 * @param {import("./type").storeComputedAction} params
 * @returns {import("./type").storeMapValue|undefined}
 */
export const storeComputedAction = ({ state, prop, keys, fn }) => {
    const { callBackComputed } = state;

    // Create a temp array with the future computed added to check
    const tempComputedArray = [...callBackComputed, { prop, keys, fn }];

    // Get all prop stored in tempComputedArray
    const propList = tempComputedArray.flatMap((item) => item.prop);

    //  Keys can't be a prop used in some computed
    const keysIsusedInSomeComputed = propList.some((item) =>
        keys.includes(item)
    );

    /**
     * if - Key to watch can't be a prop used in some computed to avoid infinite loop
     *
     * @param  {boolean} keysIsusedInSomeComputed
     * @return {void}
     */
    if (keysIsusedInSomeComputed) {
        storeComputedKeyUsedWarning(keys, getLogStyle());
        return;
    }

    callBackComputed.add({
        prop,
        keys,
        fn,
    });

    return {
        ...state,
        callBackComputed,
    };
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string[]} param.keys
 * @param {string} param.prop
 * @param {() => void} param.callback
 * @returns {void}
 */
export const storeComputedEntryPoint = ({
    instanceId,
    prop,
    keys,
    callback,
}) => {
    const state = getFormMainMap(instanceId);
    if (!state) return;

    const newState = storeComputedAction({
        state,
        prop,
        keys,
        fn: callback,
    });

    if (!newState) return;
    updateMainMap(instanceId, newState);
};
