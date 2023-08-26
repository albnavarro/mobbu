// @ts-check

import { componentStore } from '../store.js';

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {any} obj.value
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setCurrentListValueById = ({ id = '', value }) => {
    if (!id || id === '') return undefined;

    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                return id === currentId
                    ? {
                          ...item,
                          ...{ currentRepeaterState: value, isRepeater: true },
                      }
                    : item;
            });
        }
    );
};

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @return { any }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getCurrentListValueById = ({ id = '' }) => {
    if (!id || id === '') return false;

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    /**
     */
    return instance?.currentRepeaterState;
};
