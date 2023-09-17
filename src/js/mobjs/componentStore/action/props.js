// @ts-check

import { storeAction } from '../../createComponent';
import { componentStore } from '../store';

export const setDynamicPropsWatch = ({ id = '', unWatchArray = [] }) => {
    componentStore[storeAction](
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId, parentPropsWatcher } = item;

                // Assign is if existe a parent component and current parentId is null/undefined
                return id === currentId
                    ? {
                          ...item,

                          parentPropsWatcher: [
                              ...parentPropsWatcher,
                              ...unWatchArray,
                          ],
                      }
                    : item;
            });
        }
    );
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

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const { parentPropsWatcher } =
        instances.find(({ id: currentId }) => {
            return currentId === id;
        }) || {};

    parentPropsWatcher.forEach((unwatch) => {
        unwatch();
    });
};
