// @ts-check

import { useComponent } from '../component-list';

let defaultComponent = {
    scoped: false,
    maxParseIteration: 5000,
    debug: false,
};

/**
 * @param {import('../../type').DefaultComponent} obj
 * @returns {void}
 *
 * @description
 */
export const setDefaultComponent = (obj) => {
    defaultComponent = { ...defaultComponent, ...obj };
};

/**
 * @returns {import('../../type').DefaultComponent}
 */
export const getDefaultComponent = () => defaultComponent;

export const getDebugMode = () => {
    const { debug } = getDefaultComponent();
    return debug;
};

/**
 * @type {import('../../type').CreateComponent<any>}
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
