import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import {
    registerComponent,
    setDestroyCallback,
    setParentsComponent,
} from './componentStore';
import { addOnMoutCallback, getPropsFromParent } from './mainStore';
import { IS_COMPONENT } from './utils';

/**
 *  Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component }) => {
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const newComponent = document.createElement('div');
    newComponent.setAttribute(IS_COMPONENT, component.dataset.component);

    /**
     * Get props
     */
    const propsId = component.dataset.props;
    const propsFromParent = getPropsFromParent(propsId);

    /**
     * Add element to DOM
     */
    component.replaceWith(newComponent);

    /**
     * Create Univoque id
     */
    const id = getUnivoqueId();
    newComponent.id = id;

    /**
     * Get new component
     */
    const element = parentNode.querySelector(`#${id}`);

    /**
     * Add previous and new content.
     */
    element.insertAdjacentHTML('beforeEnd', prevContent);

    /**
     * Set props.
     */
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
        /**
         * Add real content from render function
         */
        element.insertAdjacentHTML('afterbegin', content);

        /**
         * Get inner content and copy data from provvisory component
         */
        const firstChild = element.firstElementChild;
        firstChild.id = element.id;
        firstChild.setAttribute(
            'data-iscomponent',
            element.dataset.iscomponent
        );

        /**
         * Delete provvisory component and add real component.
         */
        element.replaceWith(...element.childNodes);
        resolve({ newElement: firstChild });
        // }, 500);
    });
};

/**
 * Create component
 */
export const createComponent = ({ component, state = {} }) => {
    /**
     * Create basic DOM element
     */
    const { element, props, id } = convertToGenericElement({
        component,
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
