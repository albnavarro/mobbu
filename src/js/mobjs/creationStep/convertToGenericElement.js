import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getPropsFromParent } from '../mainStore/actions/props';
import { IS_COMPONENT, PROPS_FROM_SLOT } from '../constant';
import { propsValidate } from './utils';

/**
 *  Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component, defaultProps }) => {
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const newComponent = document.createElement('div');
    newComponent.setAttribute(IS_COMPONENT, '');

    /**
     * Get props
     */
    const instanceName = component.dataset?.instancename ?? '';
    const propsId = component.dataset.props;
    const propsSlot = component.dataset[PROPS_FROM_SLOT];
    const cleanProsId = propsId?.split(' ').join('');
    const cleanProsFromSlot = propsSlot?.split(' ').join('');
    const propsFromParent = getPropsFromParent(cleanProsId);
    const propsFromSlot = getPropsFromParent(cleanProsFromSlot);

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
    delete baseProps.propsfromslot;
    delete baseProps.runtime;

    propsValidate({ componentName, defaultProps, props: baseProps });
    propsValidate({ componentName, defaultProps, props: propsFromParent });
    propsValidate({ componentName, defaultProps, props: propsFromSlot });

    return {
        placeholderElement,
        props: {
            ...defaultProps,
            ...baseProps,
            ...propsFromParent,
            ...propsFromSlot,
        },
        id,
        componentName,
        instanceName,
        key,
    };
};
