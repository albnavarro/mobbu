import { createCodeButton } from '../component/code/codeButton';
import { createHeaderNav } from '../component/headernav/headernav';
import { createTestComponent } from '../component/test/testComponent';
import { createTestComponent2 } from '../component/test/testComponent2';
import { setParentsComponent } from './componentStore';
import { WILL_COMPONENT } from './utils';

const componentRegistered = {
    code_button: createCodeButton,
    header_nav: createHeaderNav,
    test_component: createTestComponent,
    test_component_2: createTestComponent2,
};

/**
 * Create all component from DOM.
 */
export const parseComponents = ({ element = null, index = 0 }) => {
    if (!element) return;

    /**
     * Get the first data-component element.
     * So after we cna render the child component.
     * render components form top to botton so we are shure that child component
     * can watch parent
     */
    const component = element.querySelector(`[${WILL_COMPONENT}]`);

    // if there is no component end.
    if (!component) {
        setParentsComponent();
        return;
    }

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
