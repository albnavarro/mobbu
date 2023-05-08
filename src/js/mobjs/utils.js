import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import { parseComponents } from './componentParse';
import {
    IS_COMPONENT,
    IS_RUNTIME,
    IS_RUNTIME_DATASET,
    WILL_COMPONENT,
} from './constant';
import { getComponentList } from './mainStore/actions/componentList';

/**
 * Add a runtime id to all component inside a div
 * Return the runtime id.
 */
export const createRunTimeComponent = async ({ container }) => {
    const selectorDefaultTag = getSelectorDefaultTag();
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
    const { uniqueId, hasComponentInside } = await createRunTimeComponent({
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

/**
 * Get component Object with name in upepr canse and the value is the original name.
 * Name in uppercase is necessary for element.tagName
 */
export const getComponentsReference = () => {
    const componentList = getComponentList();

    return Object.keys(componentList)
        .map((key) => ({
            [key.toUpperCase()]: key,
        }))
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};

/**
 * Select component default by tagname.
 * Select <component name>:not[is-runtime]:not[data-iscomponent]
 */
export const getSelectorDefaultTag = () => {
    const componentsReference = getComponentsReference();

    return Object.values(componentsReference)
        .map((value) => {
            return `${value}:not([${IS_RUNTIME}]):not([${IS_COMPONENT}])`;
        })
        .join(', ');
};

/**
 * Non runtime default
 * Select [data-component]:not[is-runtime]:not[data-iscomponent]
 */
export const selectorDefault = `[${WILL_COMPONENT}]:not([${IS_RUNTIME}]:not([${IS_COMPONENT}]))`;
