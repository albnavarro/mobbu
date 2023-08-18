// @ts-check

import { getUnivoqueId } from '../../mobbu/animation/utils/animationUtils';
import { getPropsFromParent } from '../mainStore/actions/props';
import {
    ATTR_DYNAMIC_PARTIAL,
    ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL,
    ATTR_INSTANCENAME_PARTIAL,
    ATTR_IS_COMPONENT,
    ATTR_PROPS_PARTIAL,
    ATTR_PROPS_FROM_SLOT_PARTIAL,
} from '../constant';
import { propsKeyToExclude } from './utils';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @returns {{placeholderElement:HTMLElement, props: Object, id:String, componentName:String, instanceName:String, key:String, dynamicPropsId:( string|undefined ), dynamicPropsIdFromSlot:( string|undefined )}}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const convertToGenericElement = ({ component }) => {
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
    newComponent.setAttribute(ATTR_IS_COMPONENT, '');

    /**
     * @type {String}
     *
     * @description
     * Create Univoque id
     */
    const id = getUnivoqueId();
    newComponent.id = id;

    /**
     * Get props
     */

    /**
     * @type {String}
     */
    const instanceName = component.dataset?.[ATTR_INSTANCENAME_PARTIAL] ?? '';

    /**
     * @type {String|undefined}
     */
    const propsId = component.dataset?.[ATTR_PROPS_PARTIAL];

    const dynamicPropsId = component.dataset?.[ATTR_DYNAMIC_PARTIAL];
    const dynamicPropsIdFromSlot =
        component.dataset?.[ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const propsSlot = component.dataset?.[ATTR_PROPS_FROM_SLOT_PARTIAL];

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

    /**
     * Remove
     */
    propsKeyToExclude.forEach((key) => delete baseProps[key]);

    return {
        placeholderElement,
        props: {
            ...baseProps,
            ...propsFromParent,
            ...propsFromSlot,
        },
        id,
        componentName,
        instanceName,
        key,
        dynamicPropsId,
        dynamicPropsIdFromSlot,
    };
};
