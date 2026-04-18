import { MobDetectBindKey } from '../../../../mob-core';
import { clamp } from '../../../utils';
import { getRepeaterInstancesCurrentData } from '../action/get-repeat-instances-map-current-data';
import { REPATE_PROXI_FAIL, REPEAT_PROXI_INDEX } from './constant';

/**
 * Reactive state for repeat. Note: bindObject can run after 'item' is destroyed ( wekRef issue ). So clamp index value
 * with current array length. The item is not visible but can fire error.
 *
 * @param {object} params
 * @param {string} params.observe
 * @param {boolean} params.hasKey
 * @param {string} [params.key]
 * @param {any} [params.keyValue]
 * @param {number} params.index
 * @param {string} params.repeatId
 * @returns {Record<string, any>}
 */
export const getRepeatProxi = ({
    observe,
    hasKey,
    key = '',
    keyValue = '',
    index,
    repeatId,
}) => {
    /**
     * Initial value.
     */
    const { alive, value: inistalState } = getRepeaterInstancesCurrentData({
        repeatId,
    });

    /**
     * - Reference Repeat is destroyed before proxi invocation
     * - Return message for repater, skip element creation
     */
    if (!alive) {
        return new Proxy(
            {},
            {
                get() {
                    return REPATE_PROXI_FAIL;
                },
                set() {
                    return false;
                },
            }
        );
    }

    /**
     * Reference Repeat exist, go on
     */
    const startValue = hasKey
        ? inistalState?.find(
              (/** @type {{ [x: string]: any }} */ item) =>
                  item[key] === keyValue
          )
        : inistalState?.[index];

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
                const { alive, value: state } = getRepeaterInstancesCurrentData(
                    {
                        repeatId,
                    }
                );

                /**
                 * - Reference Repeat is destroyed before proxi invocation
                 * - Return message for repater, skip element creation
                 */
                if (!alive) return REPATE_PROXI_FAIL;

                const maxValue = Math.max(state?.length - 1, 0);

                /**
                 * Return current.index
                 */
                if (prop === REPEAT_PROXI_INDEX) {
                    /**
                     * Return index by key.
                     */
                    if (hasKey) {
                        const indexByKey = state?.findIndex(
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
                    currentValue = state?.find(
                        (/** @type {{ [x: string]: any }} */ item) =>
                            item[key] === keyValue
                    );

                    return currentValue ?? lastValue;
                }

                /**
                 * Return value without key. Prevent undefined, return last value fallback
                 */
                lastValue = currentValue ?? lastValue;
                currentValue = state?.[clamp(index, 0, maxValue)];
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
