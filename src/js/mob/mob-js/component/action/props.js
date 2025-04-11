// @ts-check

import { componentMap } from '../store';

/**
 * @param {object} params
 * @param {string} params.id
 * @param {(() => void)[]} params.unWatchArray
 */
export const setDynamicPropsWatch = ({ id = '', unWatchArray = [] }) => {
    const item = componentMap.get(id);
    if (!item) return;

    const { parentPropsWatcher } = item;
    if (!parentPropsWatcher) return;

    componentMap.set(id, {
        ...item,
        parentPropsWatcher: [...parentPropsWatcher, ...unWatchArray],
    });
};

/**
 * Unbind reactive props from component
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {void}
 */
export const unBind = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentPropsWatcher = item?.parentPropsWatcher ?? [];

    parentPropsWatcher.forEach((unwatch) => {
        unwatch();
    });
};
