// @ts-check

import { getUnivoqueId } from '../../utils';
import { getLogStyle } from './logStyle';
import { storeWatchWarning } from './storeWarining';

/**
 * @param {import("./type").storeWatchAction} param
 * @returns {import('./type').storeWatchReturnObject}
 */
export const storeWatchAction = ({ state, prop, callback = () => {} }) => {
    const { store, callBackWatcher } = state;
    const logStyle = getLogStyle();

    if (!(prop in store)) {
        storeWatchWarning(prop, logStyle);

        return {
            state: undefined,
            unsubscribeId: '',
        };
    }

    const id = getUnivoqueId();
    callBackWatcher.set(id, { fn: callback, prop });

    return {
        state: { ...state, callBackWatcher },
        unsubscribeId: id,
    };
};
