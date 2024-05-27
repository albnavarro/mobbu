// @ts-check

let defaultComponent = {
    isolateCreation: false,
    isolateOnMount: false,
    scoped: false,
    maxParseIteration: 5000,
    debug: false,
};

/**
 * @param {import('./type').defaultComponent} obj
 * @returns object
 *
 * @description
 */
export const setDefaultComponent = (obj) => {
    defaultComponent = { ...defaultComponent, ...obj };
};

/**
 * @returns {import('./type').defaultComponent}
 */
export const getDefaultComponent = () => defaultComponent;

/**
 * @param {import('./type').createComponentType} param
 * @returns object<string:{componentFunction:function,componentParams:Object}>
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponent = ({
    name = '',
    component = () => {},
    state = {},
    exportState = [],
    isolateCreation,
    isolateOnMount,
    scoped,
    constructorCallback = () => {},
    connectedCallback = () => {},
    disconnectedCallback = () => {},
    adoptedCallback = () => {},
    attributeToObserve = [],
    attributeChangedCallback = () => {},
    style = '',
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                isolateCreation,
                isolateOnMount,
                scoped,
                state,
                constructorCallback,
                connectedCallback,
                disconnectedCallback,
                adoptedCallback,
                attributeToObserve,
                attributeChangedCallback,
                style,
            },
        },
    };
};
