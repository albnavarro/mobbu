// @ts-check

import { checkIfStateIsExportable } from '../../mainStore/actions/exportState';
import { componentMap, componentStore } from '../store';

/**
 * @param {string} id
 * @return Object
 *
 * @description
 * Get state
 */
export const getStateById = (id = '') => {
    if (!id || id === '') return;

    // const { instances } = componentStore.get();
    //
    // /**
    //  * @type {import('../store.js').componentStoreType}
    //  */
    // const instance = instances.find(({ id: currentId }) => currentId === id);
    //
    // const state = instance?.state;
    // if (!state) {
    //     console.warn(`getStateById failed no id found`);
    //     return null;
    // }

    const { state } = componentMap.get(id);

    return state.get();
};

/**
 * @param {String} id
 * @param {String} prop
 * @param {any} value
 * @param {Boolean} fire
 * @returns void
 *
 * @description
 * Set state
 */
export const setStateById = (id = '', prop = '', value, fire = true) => {
    if ((!id || id === '') && (!prop || prop === '') && !value) return;

    // const { instances } = componentStore.get();
    //
    // /**
    //  * @type {import('../store.js').componentStoreType}
    //  */
    // const instance = instances.find(({ id: currentId }) => currentId === id);
    //
    // const state = instance?.state;
    // const componentName = instance?.component;

    const item = componentMap.get(id);
    const state = item?.state;
    const componentName = item?.component;

    const stateIsExportable = checkIfStateIsExportable({
        componentName,
        propName: prop,
    });

    if (!stateIsExportable) {
        console.warn(
            `setStateById failed ${prop} in: ${componentName} is not exportable`
        );
        return null;
    }

    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.set(prop, value, fire);
};
