import { componentList } from './componentList';
import { setElementById } from './componentStore';
import { convertToRealElement } from './creationStep/convertToRealElement';
import { registerGenericElement } from './creationStep/registerGenericElement';
import { fireOnMountCallBack } from './mainStore';
import { WILL_COMPONENT } from './utils';

/**
 * Create all component from DOM.
 */
const parseComponentsRecursive = async ({
    element = null,
    renderedElement = null,
    index = 0,
}) => {
    if (!element) return Promise.resolve();

    /**
     * Remove component component-data attribute.
     * After component mounted is unnecessary
     */
    if (renderedElement) renderedElement.setAttribute('data-iscomponent', '');

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
    const userFunctionComponent = componentList?.[key]?.componentFunction;
    const componentParams = componentList?.[key]?.componentParams;

    // if componentToParse is not in list remove div component
    if (!userFunctionComponent) {
        console.warn(`${key} component is not registered.`);

        componentToParse.remove();
        await parseComponentsRecursive({
            element,
            index: index++,
        });
        return;
    }
    /**
     * 1 - Create basic DOM element
     * 2 - Register component to store
     * 3 - Return methods and props for userFunctionComponent (componentData)
     */
    const componentData = registerGenericElement({
        component: componentToParse,
        ...componentParams,
    });

    /**
     * Lauch userFunctionComponent and wait for render function wirh custom DOM
     * to add to component.
     */
    const {
        content,
        element: placeholderElement,
        id,
    } = await userFunctionComponent(componentData);

    /**
     * Add custom DOM to basic component
     */
    const { newElement } = await convertToRealElement({
        content,
        element: placeholderElement,
    });

    /**
     * Update last DOM element in store.
     */
    setElementById({ id, newElement });

    /**
     * Fire onMount callback
     */
    fireOnMountCallBack({ id, element: newElement });

    // Check for another component
    await parseComponentsRecursive({
        element,
        renderedElement: newElement,
        index: index++,
    });
};

export const parseComponents = async ({ element = null, index = 0 }) => {
    await parseComponentsRecursive({ element, index });
};
