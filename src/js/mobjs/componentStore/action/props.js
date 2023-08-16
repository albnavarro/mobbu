// @ts-check

import { componentStore } from '../store';

export const setDynamicPropsWatch = ({ id = '', unWatchArray = [] }) => {
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                // Assign is if existe a parent component and current parentId is null/undefined
                return id === currentId
                    ? {
                          ...item,
                          ...{
                              parentPropsWatcher: [
                                  ...item.parentPropsWatcher,
                                  ...unWatchArray,
                              ],
                          },
                      }
                    : item;
            });
        }
    );
};
