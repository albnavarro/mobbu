import { parseComponents } from '../componentParse';
import { updateChildrenOrder } from '../componentStore/action';
import { addWithKey } from './addWithKey';
import { addWithoutKey } from './addWithoutKey';
import { listKeyExist } from './utils';

// First try array of object.
export const updateChildren = async ({
    state,
    containerList,
    targetComponent = '',
    current = [],
    previous = [],
    getChildren,
    key = null,
    id,
}) => {
    /**
     * If there isn't new children return;
     */
    if (JSON.stringify(current) === JSON.stringify(previous)) return;

    /**
     * Check if thereis a key
     */
    const hasKey = listKeyExist({ current, previous, key });

    /**
     * Filter right function
     */
    const fn = hasKey ? addWithKey : addWithoutKey;

    /**
     * Execue function.
     */
    const currentUnivoque = fn({
        state,
        current,
        previous,
        containerList,
        targetComponent,
        getChildren,
        key,
        id,
    });

    /**
     * Parse new component if there is ( added is executed )
     */
    await parseComponents({ element: containerList, excludeRuntime: false });

    updateChildrenOrder({
        id,
        component: targetComponent,
    });

    /**
     * Return update current without duplicate fi needed by addWithkey.
     */
    return currentUnivoque;
};
