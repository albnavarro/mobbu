// @ts-check

import { componentMap } from '../store';

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
 * @param {object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Unbind reactive props from component
 */
export const unBind = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentPropsWatcher = item?.parentPropsWatcher ?? [];

    parentPropsWatcher.forEach((unwatch) => {
        unwatch();
    });
};
