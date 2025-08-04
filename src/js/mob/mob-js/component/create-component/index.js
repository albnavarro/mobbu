import { useComponent } from '../component-list';

let defaultComponent = {
    scoped: false,
    maxParseIteration: 5000,
    debug: false,
};

/**
 * @param {import('../../type').DefaultComponent} obj
 * @returns {void}
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
 * Format component definition in object key: value. name, function, props, state
 *
 * @type {import('../../type').CreateComponent}
 */
export const createComponent = ({
    tag = '',
    component = () => '',
    state = {},
    bindStore,
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
     * Load child component. ( launch createComponent recursvly )
     */
    useComponent(child);

    return {
        [tag]: {
            componentFunction: component,
            componentParams: {
                exportState,
                scoped,
                state,
                bindStore,
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
