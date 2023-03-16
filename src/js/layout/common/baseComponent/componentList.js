import { addContent, createComponent } from './componentCreate';
import { componentRegistered } from './componentRegister';
import { fireOnMountCallBack } from './mainStore';
import { WILL_COMPONENT } from './utils';

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
    const userFunctionComponent = componentRegistered?.[key]?.fn;
    const params = componentRegistered?.[key]?.params;

    // if component is not in list remove div component
    if (!userFunctionComponent) {
        component.remove();
    } else {
        const componentData = createComponent(params(component));
        const { content, element, id } = await userFunctionComponent(
            componentData
        );
        await addContent({ content, element });
        fireOnMountCallBack({ id });
    }

    // Check for another component
    parseComponents({ element, index: index++ });
};
