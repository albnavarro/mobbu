import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import { selectorDefault, selectorDefaultTag } from './componentParse';

export const WILL_COMPONENT = 'data-component';
export const IS_COMPONENT = 'data-iscomponent';
export const IS_CANCELLABLE = 'data-cancellable';
export const IS_RUNTIME = 'data-runtime';
export const IS_RUNTIME_DATASET = 'runtime';

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

    return uniqueId;
};
