import { MobDetectBindKey } from '../../../../mob-core';
import { getStateById } from '../../../component/action/state/get-state-by-id';
import { clamp } from '../../../utils';

const REPEAT_PROXI_INDEX = 'index';

/**
 * @param {object} params
 * @param {any} params.state
 * @param {string} params.prop
 * @param {string} params.key
 * @param {string} params.keyValue
 * @param {boolean} params.hasKey
 */
const showDuplicatedWaring = ({ state, prop, key, keyValue, hasKey }) => {
    const keyIsDuplicated = hasKey
        ? state?.[prop]?.filter(
              (/** @type {{ [x: string]: any }} */ item) =>
                  item[key] === keyValue
          )?.length > 1
        : false;

    if (keyIsDuplicated) {
        console.warn(
            ` ${keyValue} Key is duplicated, repeater with key proxi can fail `
        );
    }
};

/**
 * Reactive state for repeat. Note: bindObject can run after 'item' is destroyed ( wekRef issue ). So clamp index value
 * with current array length. The item is not visible but can fire error.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.observe
 * @param {boolean} params.hasKey
 * @param {string} [params.key]
 * @param {any} [params.keyValue]
 * @param {number} params.index
 * @returns {Record<string, any>}
 */
export const getRepeatProxi = ({
    id,
    observe,
    hasKey,
    key = '',
    keyValue = '',
    index,
}) => {
    /**
     * Initial value.
     */
    const inistalState = getStateById(id);

    showDuplicatedWaring({
        state: inistalState,
        prop: observe,
        key,
        keyValue,
        hasKey,
    });

    const startValue = hasKey
        ? inistalState?.[observe]?.find(
              (/** @type {{ [x: string]: any }} */ item) =>
                  item[key] === keyValue
          )
        : inistalState?.[observe]?.[index];

    let currentValue = startValue;
    let lastValue = startValue;

    return new Proxy(
        {},
        {
            get(_, prop) {
                /**
                 * Autodetect dependencies
                 */
                MobDetectBindKey.setCurrentDependencies(observe);

                /**
                 * Use last updated state Proxi target should be not last value.
                 */
                const state = getStateById(id);

                showDuplicatedWaring({
                    state,
                    prop: observe,
                    key,
                    keyValue,
                    hasKey,
                });

                const maxValue = Math.max(state?.[observe].length - 1, 0);

                /**
                 * Return current.index
                 */
                if (prop === REPEAT_PROXI_INDEX) {
                    /**
                     * Return index by key.
                     */
                    if (hasKey) {
                        const indexByKey = state?.[observe]?.findIndex(
                            (/** @type {{ [x: string]: any }} */ item) =>
                                item[key] === keyValue
                        );

                        return clamp(indexByKey, 0, maxValue);
                    }

                    /**
                     * Return index without key.
                     */
                    return clamp(index, 0, maxValue);
                }

                /**
                 * Return current.value ( default ). Return value by key Prevent undefined, return last value fallback
                 */
                if (hasKey) {
                    lastValue = currentValue ?? lastValue;
                    currentValue = state?.[observe]?.find(
                        (/** @type {{ [x: string]: any }} */ item) =>
                            item[key] === keyValue
                    );

                    return currentValue ?? lastValue;
                }

                /**
                 * Return value without key. Prevent undefined, return last value fallback
                 */
                lastValue = currentValue ?? lastValue;
                currentValue = state?.[observe]?.[clamp(index, 0, maxValue)];
                return currentValue ?? lastValue;
            },
            set() {
                /**
                 * Set action not allowed.
                 */
                return false;
            },
        }
    );
};
