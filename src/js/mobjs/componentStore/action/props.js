// @ts-check

import { componentMap } from '../store';

export const setDynamicPropsWatch = ({ id = '', unWatchArray = [] }) => {
    const item = componentMap.get(id);
    const { parentPropsWatcher } = item;
    componentMap.set(id, {
        ...item,
        parentPropsWatcher: [...parentPropsWatcher, ...unWatchArray],
    });
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Unbind reactive props from component
 */
export const unBind = ({ id = '' }) => {
    if (!id || id === '') return;

    const { parentPropsWatcher: parentPropsWatcher2 } = componentMap.get(id);
    parentPropsWatcher2.forEach((unwatch) => {
        unwatch();
    });
};
