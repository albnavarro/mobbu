import { getStateById } from '../../../component/action/state/getStateById';
import { clamp } from '../../../utils';

const REPEAT_PROXI_INDEX = 'index';

/**
 * @description
 * Reactive state for repeat.
 * Note:
 * bindProxi can run after 'item' is destroyed ( wekRef issue ).
 * So clamp index value with current array length.
 * The item is not visible but can fire error.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bind
 * @param {boolean} params.hasKey
 * @param {string} [ params.key ]
 * @param {any} [ params.keyValue ]
 * @param {number} params.index
 * @returns {Record<string, any>}
 */
export const getRepeatProxi = ({
    id,
    bind,
    hasKey,
    key = '',
    keyValue = '',
    index,
}) => {
    /**
     * Initial value.
     */
    const inistalState = getStateById(id);
    const startValue = hasKey
        ? inistalState?.[bind]?.find(
              (/** @type {{ [x: string]: any; }} */ item) =>
                  item[key] === keyValue
          )
        : inistalState?.[bind]?.[index];

    let currentValue = startValue;
    let lastValue = startValue;

    return new Proxy(
        {},
        {
            get(_, prop) {
                /**
                 * Use last updated state
                 * Proxi target should be not last value.
                 */
                const state = getStateById(id);
                const maxValue = Math.max(state?.[bind].length - 1, 0);

                /**
                 * Return current.index
                 */
                if (prop === REPEAT_PROXI_INDEX) {
                    /**
                     * Return index by key.
                     */
                    if (hasKey) {
                        const indexByKey = state?.[bind]?.findIndex(
                            (/** @type {{ [x: string]: any; }} */ item) =>
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
                 * Return current.value ( default ).
                 * Return value by key
                 * Prevent undefined, return last value fallback
                 */
                if (hasKey) {
                    lastValue = currentValue;
                    currentValue = state?.[bind]?.find(
                        (/** @type {{ [x: string]: any; }} */ item) =>
                            item[key] === keyValue
                    );

                    return currentValue ?? lastValue;
                }

                /**
                 * Return value without key.
                 * Prevent undefined, return last value fallback
                 */
                lastValue = currentValue;
                currentValue = state?.[bind]?.[clamp(index, 0, maxValue)];
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
