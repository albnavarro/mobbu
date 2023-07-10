// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getPropsFromParent } from '../mainStore/actions/props';
import {
    INSTANCENAME_DATASET,
    IS_COMPONENT,
    PROPS_FROM_SLOT,
} from '../constant';
import { propsValidate } from './utils';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @param {Object} obj.defaultProps
 * @returns {{placeholderElement:HTMLElement, props: Object, id:String, componentName:String, instanceName:String, key:String}}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component, defaultProps }) => {
    /**
     * @type {HTMLElement}
     */
    const parentNode = /** @type {HTMLElement} */ (component.parentNode);

    /**
     * @type {String}
     */
    const prevContent = component.innerHTML;

    /**
     * @type {HTMLElement}
     */
    const newComponent = document.createElement('div');
    newComponent.setAttribute(IS_COMPONENT, '');

    /**
     * Get props
     */

    /**
     * @type {String}
     */
    const instanceName = component.dataset?.[INSTANCENAME_DATASET] ?? '';

    /**
     * @type {String|undefined}
     */
    const propsId = component.dataset?.props;

    /**
     * @type {String|undefined}
     */
    const propsSlot = component.dataset?.[PROPS_FROM_SLOT];

    /**
     * @type {String|undefined}
     */
    const cleanProsId = propsId?.split(' ').join('');

    /**
     * @type {String|undefined}
     */
    const cleanProsFromSlot = propsSlot?.split(' ').join('');

    /**
     * @type {Object}
     */
    const propsFromParent = getPropsFromParent(cleanProsId);

    /**
     * @type {Object}
     */
    const propsFromSlot = getPropsFromParent(cleanProsFromSlot);

    /**
     * Add element to DOM
     */
    component.replaceWith(newComponent);

    /**
     * @type {String}
     *
     * @description
     * Create Univoque id
     */
    const id = getUnivoqueId();
    newComponent.id = id;

    /**
     * @type {HTMLElement}
     *
     * @description
     * Get new component
     */
    const placeholderElement = /** @type{HTMLElement} */ (
        parentNode.querySelector(`#${id}`)
    );

    /**
     * Add previous and new content.
     */
    // @ts-ignore
    placeholderElement.insertAdjacentHTML('beforeEnd', prevContent);

    /**
     * @type {Object}
     *
     * @description
     * Set props.
     */
    const baseProps = { ...component.dataset };

    /**
     * @type {String}
     *
     * @description
     * Set props.
     */
    const componentName = baseProps?.component ?? '';

    /**
     * @type {String}
     *
     */
    const key = baseProps?.key ?? '';

    delete baseProps.props;
    delete baseProps.component;
    delete baseProps.propsfromslot;
    delete baseProps.runtime;
    delete baseProps.key;
    delete baseProps.instancename;
    delete baseProps.cancellable;

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
