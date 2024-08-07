// @ts-check

import { useComponent } from '../componentList';

let defaultComponent = {
    scoped: false,
    maxParseIteration: 5000,
    debug: false,
};

/**
 * @param {import('../../type').defaultComponent} obj
 * @returns {void}
 *
 * @description
 */
export const setDefaultComponent = (obj) => {
    defaultComponent = { ...defaultComponent, ...obj };
};

/**
 * @returns {import('../../type').defaultComponent}
 */
export const getDefaultComponent = () => defaultComponent;

/**
 * @param {import('../../type').createComponentType} param
 * @returns {import('../../type').createComponentReturnType}
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponent = ({
    name = '',
    component = () => '',
    state = {},
    exportState = [],
    scoped,
    constructorCallback = () => {},
    connectedCallback = () => {},
    disconnectedCallback = () => {},
    adoptedCallback = () => {},
    attributeToObserve = [],
    attributeChangedCallback = () => {},
    style = '',
    child = [],
}) => {
    /**
     * Load child component.
     * ( launch createComponent recursvly )
     */
    useComponent(child);

    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                scoped,
                state,
                constructorCallback,
                connectedCallback,
                disconnectedCallback,
                adoptedCallback,
                attributeToObserve,
                attributeChangedCallback,
                style,
                child,
            },
        },
    };
};
