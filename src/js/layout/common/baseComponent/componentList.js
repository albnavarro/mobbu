import { createCodeButton } from '../component/code/codeButton';

const componentRegistered = {
    code_button: createCodeButton,
};

/**
 * Create all component from DOM.
 */
export const componentListCreate = ({ element = null }) => {
    if (!element) return;

    // check if there is some component
    const components = element.querySelectorAll('[data-component]');
    if (components.length === 0) return;

    // loop every component
    [...components].reverse().forEach((component) => {
        // If there is a child component skip for next recursive loop.
        // const hasComponent = component.querySelector('[data-component]');
        // if (hasComponent) return;

        // get component name and run creation
        const key = component.dataset.component;
        const componentFn = componentRegistered?.[key];

        // If component is no registered skip
        if (!componentFn) return;

        componentFn({ component });
    });
};
