import { parseComponents } from './componentParse';
import { createRunTimeComponent } from '../utils';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.container
 * @return void
 *
 * Parse DOM element searching component.
 * in recursive mode until there is.
 * All parse has a runtime idd.
 */
export const parseRuntime = async ({ container }) => {
    /**
     * Search for innercomponent and add a runtime id
     * So run a concurrent parseComponents outside the main parse.
     */
    const { uniqueId, hasComponentInside } = createRunTimeComponent({
        container,
    });

    if (!hasComponentInside) return;

    /**
     * Parse inner component.
     */
    await parseComponents({
        element: container,
        runtimeId: uniqueId,
    });

    parseRuntime({ container });
};
