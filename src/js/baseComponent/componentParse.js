import { componentList } from './componentList';
import { setElementById } from './componentStore/action';
import { convertToRealElement } from './creationStep/convertToRealElement';
import { registerGenericElement } from './creationStep/registerGenericElement';
import { fireOnMountCallBack } from './mainStore';
import { IS_RUNTIME, WILL_COMPONENT } from './utils';

/**
 * Create all component from DOM.
 */
const parseComponentsRecursive = async ({ element, index, excludeRuntime }) => {
    if (!element) return Promise.resolve();

    /**
     * Get the first data-component element.
     * So after we cna render the child component.
     * render components form top to botton so we are shure that child component
     * can watch parent
     */
    const componentToParse = excludeRuntime
        ? element.querySelector(`[${WILL_COMPONENT}]:not([${IS_RUNTIME}])`)
        : element.querySelector(`[${WILL_COMPONENT}]`);

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
    const { content, placeholderElement, id } = await userFunctionComponent(
        componentData
    );

    /**
     * Add custom DOM to basic component
     */
    const { newElement } = await convertToRealElement({
        content,
        placeholderElement,
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
        index: index++,
        excludeRuntime,
    });
};

export const parseComponents = async ({
    element = null,
    index = 0,
    excludeRuntime = true,
}) => {
    await parseComponentsRecursive({ element, index, excludeRuntime });
};
