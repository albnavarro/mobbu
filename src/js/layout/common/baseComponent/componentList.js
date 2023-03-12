import { createCodeButton } from '../component/code/codeButton';
import { createHeaderNav } from '../component/headernav/headernav';
import { cleanStoreComponent } from './componentStore';

const componentRegistered = {
    code_button: createCodeButton,
    header_nav: createHeaderNav,
};

/**
 * Create all component from DOM.
 */
export const componentListCreate = ({ element = null }) => {
    if (!element) return;

    // check if there is some component
    const components = element.querySelectorAll('[data-component]');
    if (components.length === 0) {
        cleanStoreComponent();
        return;
    }

    // loop every component
    [...components].forEach((component) => {
        // get component name and run creation
        const key = component.dataset.component;
        const componentFn = componentRegistered?.[key];

        // If component is no registered skip
        if (!componentFn) return;

        componentFn({ component });
    });

    componentListCreate({ element });
};
