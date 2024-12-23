import { getStateById } from '../../../component/action/state/getStateById';

function clamp(num, lower, upper) {
    return Math.min(Math.max(num, lower), upper);
}

export const getRepeatProxi = ({
    id,
    bind,
    hasKey,
    key = '',
    keyValue = '',
    index,
}) => {
    const state = getStateById(id);

    return new Proxy(state, {
        get(target, prop) {
            if (prop === 'index') {
                const maxValue = target?.[bind].length - 1;

                /**
                 * Return index by key.
                 */
                if (hasKey) {
                    const currentIndex = target?.[bind].findIndex(
                        (item) => item[key] === keyValue
                    );

                    return clamp(currentIndex, 0, maxValue);
                }

                /**
                 * Return index without key.
                 */
                return clamp(index, 0, maxValue);
            }

            if (prop === 'value') {
                /**
                 * Return index by key.
                 */
                if (hasKey) {
                    return target?.[bind]?.find(
                        (item) => item[key] === keyValue
                    );
                }

                /**
                 * Return index without key.
                 */
                return target?.[bind]?.[index];
            }

            return false;
        },
        set() {
            /**
             * No set allowed
             */
            return false;
        },
    });
};
