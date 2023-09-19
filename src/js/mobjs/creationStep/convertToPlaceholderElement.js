// @ts-check

import { getPropsFromParent } from '../mainStore/actions/props';
import {
    ATTR_DYNAMIC_PARTIAL,
    ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL,
    ATTR_INSTANCENAME_PARTIAL,
    ATTR_IS_COMPONENT,
    ATTR_PROPS_PARTIAL,
    ATTR_PROPS_FROM_SLOT_PARTIAL,
    ATTR_CURRENT_LIST_VALUE_PARTIAL,
    ATTR_BIND_EVENTS_PARTIAL,
    ATTR_PLACEHOLDER,
} from '../constant';
import { propsKeyToExclude } from './utils';
import { getCurrentValueList } from '../mainStore/actions/currentListValue';
import { filterExportableStateFromObject } from '../mainStore/actions/exportState';
import { mobCore } from '../../mobCore';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @returns {{placeholderElement:HTMLElement, props: Object, id:String, componentName:String, instanceName:String, key:String, dynamicPropsId:( string|undefined ), dynamicPropsIdFromSlot:( string|undefined ),bindEventsId:( string|undefined ), currentListValueReal: any}}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const convertToPlaceHolderElement = ({ component }) => {
    /**
     * @type {String}
     */
    const prevContent = component.innerHTML;

    /**
     * @type {HTMLElement}
     */
    const placeholderElement = document.createElement('div');
    placeholderElement.setAttribute(ATTR_IS_COMPONENT, '');

    /**
     * @type {String}
     *
     * @description
     * Create Univoque id
     */
    const id = mobCore.getUnivoqueId();
    placeholderElement.setAttribute(ATTR_PLACEHOLDER, id);

    /**
     * @type {String}
     */
    const instanceName = component.dataset?.[ATTR_INSTANCENAME_PARTIAL] ?? '';

    /**
     * @type {String|undefined}
     */
    const propsId = component.dataset?.[ATTR_PROPS_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const dynamicPropsId = component.dataset?.[ATTR_DYNAMIC_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const bindEventsId = component.dataset?.[ATTR_BIND_EVENTS_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const dynamicPropsIdFromSlot =
        component.dataset?.[ATTR_DYNAMIC_PROPS_FROM_SLOT_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const propsSlot = component.dataset?.[ATTR_PROPS_FROM_SLOT_PARTIAL];

    /**
     * @type {String|undefined}
     */
    const currentListValue =
        component.dataset?.[ATTR_CURRENT_LIST_VALUE_PARTIAL];
    const currentListValueReal = getCurrentValueList(currentListValue);

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
    component.replaceWith(placeholderElement);

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
            ...filterExportableStateFromObject({
                componentName,
                currentProps: baseProps,
            }),
            ...filterExportableStateFromObject({
                componentName,
                currentProps: propsFromParent,
            }),
            ...filterExportableStateFromObject({
                componentName,
                currentProps: propsFromSlot,
            }),
        },
        id,
        componentName,
        instanceName,
        key,
        dynamicPropsId,
        dynamicPropsIdFromSlot,
        bindEventsId,
        currentListValueReal,
    };
};
