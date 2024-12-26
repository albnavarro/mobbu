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
    return new Proxy(
        {},
        {
            get(_, prop) {
                /**
                 * Use last updated state
                 * Proxi target should be not last value.
                 */
                const state = getStateById(id);

                /**
                 * Return current.index
                 */
                if (prop === REPEAT_PROXI_INDEX) {
                    const maxValue = state?.[bind].length - 1;

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
                 */
                if (hasKey) {
                    return state?.[bind]?.find(
                        (/** @type {{ [x: string]: any; }} */ item) =>
                            item[key] === keyValue
                    );
                }

                /**
                 * Return value without key.
                 */
                return state?.[bind]?.[index];
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
