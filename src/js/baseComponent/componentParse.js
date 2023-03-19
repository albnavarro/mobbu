import { addContent, createComponent } from './componentCreate';
import { componentRegistered } from './componentRegister';
import { getElementById, setElementById } from './componentStore';
import { fireOnMountCallBack } from './mainStore';
import { WILL_COMPONENT } from './utils';

/**
 * Create all component from DOM.
 */
const parseComponentsRecursive = async ({ element = null, index = 0 }) => {
    if (!element) return Promise.resolve();

    /**
     * Get the first data-component element.
     * So after we cna render the child component.
     * render components form top to botton so we are shure that child component
     * can watch parent
     */
    const componentToParse = element.querySelector(`[${WILL_COMPONENT}]`);

    // if there is no component end.
    if (!componentToParse) return Promise.resolve();

    const key = componentToParse?.dataset?.component;
    const userFunctionComponent = componentRegistered?.[key]?.componentFunction;
    const componentParams = componentRegistered?.[key]?.componentParams;

    // if componentToParse is not in list remove div component
    if (!userFunctionComponent) {
        componentToParse.remove();
    } else {
        /**
         * 1 - Create basic DOM element
         * 2 - Register component to store
         * 3 - Return methods and props for userFunctionComponent (componentData)
         */
        const componentData = createComponent({
            component: componentToParse,
            ...componentParams,
        });

        /**
         * Lauch userFunctionComponent and wait for render function wirh custom DOM
         * to add to component.
         */
        const { content, element, id } = await userFunctionComponent(
            componentData
        );

        /**
         * Add custom DOM to basic component
         */
        const { newElement } = await addContent({ content, element });
        setElementById({ id, newElement });

        /**
         * Fire onMount callback
         */
        fireOnMountCallBack({ id, element: newElement });
    }

    // Check for another component
    await parseComponentsRecursive({ element, index: index++ });
};

export const parseComponents = async ({ element = null, index = 0 }) => {
    await parseComponentsRecursive({ element, index });
};
