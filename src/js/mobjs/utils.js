import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import {
    parseComponents,
    selectorDefault,
    selectorDefaultTag,
} from './componentParse';
import { IS_RUNTIME_DATASET } from './constant';

/**
 * Add a runtime id to all component inside a div
 * Return the runtime id.
 */
export const createRunTimeComponent = ({ container }) => {
    const uniqueId = getUnivoqueId();
    const innerComponents = container.querySelectorAll(
        `${selectorDefault}, ${selectorDefaultTag}`
    );
    [...innerComponents].forEach(
        (component) => (component.dataset[IS_RUNTIME_DATASET] = uniqueId)
    );

    return { uniqueId, hasComponentInside: [...innerComponents].length };
};

/**
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
