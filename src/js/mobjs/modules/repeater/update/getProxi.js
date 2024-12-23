import { getStateById } from '../../../component/action/state/getStateById';
import { clamp } from '../../../utils';

const REPEAT_PROXI_INDEX = 'index';

/**
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
    /** @type{Record<string, any>} */
    const state = getStateById(id);

    return new Proxy(state, {
        get(target, prop) {
            /**
             * Return current.index
             */
            if (prop === REPEAT_PROXI_INDEX) {
                const maxValue = target?.[bind].length - 1;

                /**
                 * Return index by key.
                 */
                if (hasKey) {
                    const currentIndex = target?.[bind]?.findIndex(
                        (/** @type {{ [x: string]: any; }} */ item) =>
                            item[key] === keyValue
                    );

                    return clamp(currentIndex, 0, maxValue);
                }

                /**
                 * Return index without key.
                 */
                return clamp(index, 0, maxValue);
            }

            /**
             * Return current.value
             * Return index by key by default.
             */
            if (hasKey) {
                return target?.[bind]?.find(
                    (/** @type {{ [x: string]: any; }} */ item) =>
                        item[key] === keyValue
                );
            }

            /**
             * Return index without key.
             */
            return target?.[bind]?.[index];
        },
        set() {
            /**
             * Set action not allowed.
             */
            return false;
        },
    });
};
