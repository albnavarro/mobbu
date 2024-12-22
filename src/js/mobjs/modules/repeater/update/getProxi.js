import { getStateById } from '../../../component/action/state/getStateById';

export const getRepeatProxi = ({
    id,
    bind,
    hasKey,
    key,
    keyValue = '',
    index,
}) => {
    const state = getStateById(id);

    return new Proxy(state, {
        get(target, prop) {
            if (prop === 'value') {
                /**
                 * Return index by key.
                 */
                if (hasKey) {
                    const currentIndex = target?.[bind].findIndex(
                        (item) => item[key] === keyValue
                    );

                    return currentIndex;
                }

                /**
                 * Return index without key.
                 */
                return index;
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
