// @ts-check

import { checkIfStateIsExportable } from './exportState';
import { componentMap } from '../store';
import { getIdByInstanceName } from './component';
import { getFreezePropStatus } from './freeze';

/**
 * @param {string} id
 * @return object
 *
 * @description
 * Get state
 */
export const getStateById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const state = item?.state;
    return state?.get();
};

/**
 * @param {string} name
 * @return object
 *
 * @description
 * Get state by name
 */
export const getStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return getStateById(id);
};

/**
 * @param {string} id
 * @param {string} prop
 * @param {any} value
 * @param {boolean} fire
 * @returns {void}
 *
 * @description
 * Set state
 */
export const setStateById = (id = '', prop = '', value, fire = true) => {
    if ((!id || id === '') && (!prop || prop === '') && !value) return;

    const isFreezed = getFreezePropStatus({ id, prop });
    if (isFreezed) {
        return;
    }

    const item = componentMap.get(id);
    const state = item?.state;
    const componentName = item?.componentName ?? '';

    const stateIsExportable = checkIfStateIsExportable({
        componentName,
        propName: prop,
    });

    if (!stateIsExportable) {
        console.warn(
            `setStateById failed ${prop} in: ${componentName} is not exportable, maybe a slot bind state that not exist here?`
        );
        return null;
    }

    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.set(prop, value, fire);
};

/**
 * @param {string} name
 * @returns {(prop:string, value:any, fire:(boolean|undefined)) => void}
 *
 * @description
 * Set state
 */
export const setStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, fire) => setStateById(id, prop, value, fire);
};

/**
 * @param {string} id
 * @param {string} prop
 * @param {() => {}} value
 * @param {boolean} fire
 * @returns {void}
 *
 * @description
 * Set state
 */
export const updateStateById = (id = '', prop = '', value, fire = true) => {
    if ((!id || id === '') && (!prop || prop === '') && !value) return;

    const isFreezed = getFreezePropStatus({ id, prop });
    if (isFreezed) {
        return;
    }

    const item = componentMap.get(id);
    const state = item?.state;
    const componentName = item?.componentName ?? '';

    const stateIsExportable = checkIfStateIsExportable({
        componentName,
        propName: prop,
    });

    if (!stateIsExportable) {
        console.warn(
            `updateStateById failed ${prop} in: ${componentName} is not exportable, maybe a slot bind state that not exist here?`
        );
        return null;
    }

    if (!state) {
        console.warn(`updateStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.update(prop, value, fire);
};

/**
 * @param {string} name
 * @returns {(prop:string, value: any, fire:(boolean|undefined)) => void}
 *
 * @description
 * Set state
 */
export const updateStateByName = (name = '') => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);

    return (prop, value, fire) => updateStateById(id, prop, value, fire);
};
