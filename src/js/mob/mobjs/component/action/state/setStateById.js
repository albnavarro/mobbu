// @ts-check

import { componentMap } from '../../store';
import { getFreezePropStatus } from '../freeze';
import { checkIfStateIsExportable } from './checkIfStateIsExportable';

/**
 * @param {string} id
 * @param {string} prop
 * @param {any} value
 * @param {{emit?: boolean}} [ options ]
 * @returns {void}
 *
 * @description
 * Set state
 */

export const setStateById = (
    id = '',
    prop = '',
    value,
    { emit = true } = {}
) => {
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
        return;
    }

    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return;
    }

    state.set(prop, value, { emit });
};
