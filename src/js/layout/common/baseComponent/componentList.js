import { CodeButton } from '../component/code/codeButton';
import { Headernav } from '../component/headernav/headernav';
import { TestComponent } from '../component/test/testComponent';
import { TestComponent2 } from '../component/test/testComponent2';
import { addContent } from './componentCreate';
import { fireOnMountCallBack } from './mainStore';
import { WILL_COMPONENT } from './utils';

const componentRegistered = {
    code_button: CodeButton,
    header_nav: Headernav,
    test_component: TestComponent,
    test_component_2: TestComponent2,
};

/**
 * Create all component from DOM.
 */
export const parseComponents = async ({ element = null, index = 0 }) => {
    if (!element) return;

    /**
     * Get the first data-component element.
     * So after we cna render the child component.
     * render components form top to botton so we are shure that child component
     * can watch parent
     */
    const component = element.querySelector(`[${WILL_COMPONENT}]`);

    // if there is no component end.
    if (!component) return;

    const key = component?.dataset?.component;
    const componentFn = componentRegistered?.[key];

    // if component is not in list remove div component
    if (!componentFn) {
        component.remove();
    } else {
        const { content, element, id } = await componentFn(component);
        await addContent({ content, element });
        fireOnMountCallBack({ id });
    }

    // Check for another component
    parseComponents({ element, index: index++ });
};
