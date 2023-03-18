import { checkType } from '../mobbu/store/storeType';
import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import {
    registerComponent,
    setDestroyCallback,
    setParentsComponent,
} from './componentStore';
import { addOnMoutCallback, getPropsFromParent } from './mainStore';
import { IS_COMPONENT } from './utils';
import { parseComponents } from './componentList';

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

    const propsId = component.dataset.props;
    const propsFromParent = getPropsFromParent(propsId);

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

    const baseProps = { ...component.dataset };
    delete baseProps.props;

    return { element, props: { ...baseProps, ...propsFromParent }, id };
};

/**
 * Add content to component
 *
 * Use async logic only for security or debug
 * With a setTimeout it is possible dibug the sequence of cration more easly
 *
 * It is possible use parseComponents() to launch the parse of
 * custom DOM added to the component immadatly
 */
export const addContent = ({ element, content }) => {
    return new Promise((resolve) => {
        // setTimeout(() => {
        element.insertAdjacentHTML('afterbegin', content);
        parseComponents({ element });
        resolve();
        // }, 500);
    });
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
    /**
     * Create basic DOM element
     */
    const { element, props, id } = convertComponent({
        component,
        className,
        type,
    });

    /**
     * Register component to store
     */
    const { getParentId, getState, setState, watch } = registerComponent({
        component,
        element,
        props,
        state,
        destroy: () => {},
        id,
    });

    // Update Parent id before render, do child can use immediatly getParentId
    setParentsComponent();

    return {
        id,
        element,
        getParentId,
        props,
        getState,
        setState,
        watch,
        render: (content) => {
            return {
                id,
                content,
                element,
            };
        },
        onDestroy: (cb) => setDestroyCallback({ cb, id }),
        onMount: (cb) => addOnMoutCallback({ id, cb }),
    };
};
