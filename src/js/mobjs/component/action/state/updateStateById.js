// @ts-check

import { componentMap } from '../../store';
import { getFreezePropStatus } from '../freeze';
import { checkIfStateIsExportable } from './checkIfStateIsExportable';

/**
 * @param {string} id
 * @param {string} prop
 * @param {() => {}} value
 * @param {{emit?: boolean, clone?: boolean}} [ options ]
 * @returns {void}
 *
 * @description
 * Update state by Id
 */

export const updateStateById = (
    id = '',
    prop = '',
    value,
    { emit = true, clone = false } = {}
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
            `updateStateById failed ${prop} in: ${componentName} is not exportable, maybe a slot bind state that not exist here?`
        );
        return;
    }

    if (!state) {
        console.warn(`updateStateById failed no id found on prop: ${prop}`);
        return;
    }

    state.update(prop, value, { emit, clone });
};
