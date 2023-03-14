import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { checkType } from '../../../mobbu/store/storeType';
import { registerComponent, setDestroyCallback } from './componentStore';
import { IS_COMPONENT } from './utils';

/**
 *  Create base DOM component from component tag.
 */
export const convertComponent = ({
    component,
    className,
    content = '',
    type = 'div',
}) => {
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const root = document.createElement(type);
    root.setAttribute(IS_COMPONENT, component.dataset.component);

    /**
     * Add main class
     */
    const classParsed = checkType(Array, className) ? className : [className];
    classParsed.forEach((item) => root.classList.add(item));

    /**
     * Add element to DOM
     */
    parentNode.appendChild(root);
    parentNode.replaceChild(root, component);

    /**
     * Create Univoque id
     */
    const id = getUnivoqueId();
    root.id = id;
    const element = parentNode.querySelector(`#${id}`);

    /**
     * Add previous and new content.
     */
    element.insertAdjacentHTML('afterbegin', content);
    element.insertAdjacentHTML('beforeEnd', prevContent);

    return { element, props: { ...component.dataset }, id };
};

/**
 * Addd content to component
 */
const addContent = ({ element, content }) => {
    element.insertAdjacentHTML('afterbegin', content);
};

/**
 * Create component
 */
export const createComponent = ({
    component,
    className = '',
    type = 'div',
    state = {},
}) => {
    const { element, props, id } = convertComponent({
        component,
        className,
        type,
    });

    const { getParentId, getProps, getState, setState, watch } =
        registerComponent({
            component,
            element,
            props,
            state,
            destroy: () => {},
            id,
        });

    return {
        id,
        element,
        getParentId,
        getProps,
        getState,
        setState,
        watch,
        render: (content) => addContent({ element, content }),
        destroy: (cb) => setDestroyCallback({ cb, id }),
    };
};
