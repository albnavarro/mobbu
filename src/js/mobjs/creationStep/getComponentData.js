// @ts-check

import { ATTR_IS_COMPONENT } from '../constant';
import { propsKeyToExclude } from './utils';
import { mobCore } from '../../mobCore';
import { getCurrentValueList } from '../temporaryData/currentRepeaterItemValue';
import { getPropsFromParent } from '../temporaryData/staticProps';
import { filterExportableStateFromObject } from '../mainStore/actions/exportState';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.component
 * @returns {{component:HTMLElement, props: Object, id:String, componentName:String, instanceName:String, key:String, dynamicPropsId:( string|undefined ), dynamicPropsIdFromSlot:( string|undefined ),bindEventsId:( string|undefined ), currentListValueReal: any}}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const getComponentData = ({ component }) => {
    component.setAttribute(ATTR_IS_COMPONENT, '');

    /**
     * @type {String}
     *
     * @description
     * Create Univoque id
     */
    const id = mobCore.getUnivoqueId();
    // @ts-ignore
    component.setId(id);

    /**
     * @type {String}
     */
    // @ts-ignore
    const instanceName = component.getInstanceName();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const propsId = component.getStaticPropsId();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const dynamicPropsId = component.getDynamicPropsid();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const bindEventsId = component.getBindEventsId();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const dynamicPropsIdFromSlot = component.getDynamicPropsFromSlotId();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const propsSlot = component.getPropsFromSlotId();

    /**
     * @type {String|undefined}
     */
    // @ts-ignore
    const currentListValue = component.getCurrentListValueId();
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
        component,
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
