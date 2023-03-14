import { createCodeButton } from '../component/code/codeButton';
import { createHeaderNav } from '../component/headernav/headernav';
import { createTestComponent } from '../component/test/testComponent';
import { setParentsComponent } from './componentStore';
import { WILL_COMPONENT } from './utils';

const componentRegistered = {
    code_button: createCodeButton,
    header_nav: createHeaderNav,
    test_component: createTestComponent,
};

/**
 * Create all component from DOM.
 */
export const parseComponents = ({ element = null, index = 0 }) => {
    if (!element) return;

    const components = element.querySelectorAll(`[${WILL_COMPONENT}]`);

    // if there is no component end.
    if (components.length === 0) {
        setParentsComponent();
        return;
    }

    const component = components[index];
    const key = component?.dataset?.component;
    const componentFn = componentRegistered?.[key];

    // if component is not in list remove div component
    if (!componentFn) {
        component.remove();
    } else {
        componentFn({ component });
    }

    // Check for another component
    parseComponents({ element, index: index++ });
};
