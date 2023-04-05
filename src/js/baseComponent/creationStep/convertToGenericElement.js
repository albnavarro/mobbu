import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getPropsFromParent } from '../mainStore/actions/props';
import { IS_COMPONENT, PROPS_FROM_SLOT } from '../utils';

/**
 *  Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component }) => {
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const newComponent = document.createElement('div');
    newComponent.setAttribute(IS_COMPONENT, '');

    /**
     * Get props
     */
    const propsId = component.dataset.props;
    const propsSlot = component.dataset[PROPS_FROM_SLOT];
    const propsFromParent = getPropsFromParent(propsId);
    const propsFromSlot = getPropsFromParent(propsSlot);

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
    delete baseProps.propsFromSlot;
    delete baseProps.runtime;

    return {
        placeholderElement,
        props: { ...baseProps, ...propsFromParent, ...propsFromSlot },
        id,
        componentName,
        key,
    };
};
