// @ts-check

import { componentStore } from '../store.js';

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {string} obj.prop
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const freezePropById = ({ id = '', prop }) => {
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
                          ...{ freezedPros: [...item.freezedPros, prop] },
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
 * @param {string} obj.prop
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const unFreezePropById = ({ id = '', prop }) => {
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
                          ...{
                              freezedPros: item.freezedPros.filter(
                                  (currentProp) => currentProp !== prop
                              ),
                          },
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
 * @param {string} obj.prop
 * @return { boolean }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getFreezePropStatus = ({ id = '', prop }) => {
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
    return instance.freezedPros.includes(prop);
};
