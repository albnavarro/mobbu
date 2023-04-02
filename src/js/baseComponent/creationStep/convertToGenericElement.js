import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getPropsFromParent } from '../mainStore/actions/props';
import { IS_COMPONENT } from '../utils';

/**
 *  Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component }) => {
    // /**
    //  * Check if component is already live.
    //  */
    // const elementExist = document.body.contains(component);
    // if (!elementExist) {
    //     return {
    //         placeholderElement: null,
    //         props: null,
    //         id: null,
    //         componentName: null,
    //         key: null,
    //     };
    // }

    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const newComponent = document.createElement('div');
    newComponent.setAttribute(IS_COMPONENT, '');

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
    const placeholderElement = parentNode.querySelector(`#${id}`);

    /**
     * Add previous and new content.
     */
    placeholderElement.insertAdjacentHTML('beforeEnd', prevContent);

    /**
     * Set props.
     */
    const baseProps = { ...component.dataset };
    const componentName = baseProps?.component;
    const key = baseProps?.key ?? null;
    delete baseProps.props;
    delete baseProps.component;

    return {
        placeholderElement,
        props: { ...baseProps, ...propsFromParent },
        id,
        componentName,
        key,
    };
};
