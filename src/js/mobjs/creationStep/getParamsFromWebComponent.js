// @ts-check

import { getComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { getPropsFromParent } from '../temporaryData/staticProps';
import { filterExportableStateFromObject } from '../mainStore/actions/exportState';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.component
 * @returns {import('./type').componentDataType}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const getParamsFromWebComponent = ({ component }) => {
    /**
     * @type {string}
     *
     */
    // @ts-ignore
    const id = component.getId();

    /**
     * @type {string}
     */
    // @ts-ignore
    const instanceName = component.getInstanceName();

    /**
     * @type {string}
     */
    // @ts-ignore
    const parentId = component.getParentId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const propsId = component.getStaticPropsId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const dynamicPropsId = component.getDynamicPropsid();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const bindEventsId = component.getBindEventsId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const dynamicPropsIdFromSlot = component.getDynamicPropsFromSlotId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const propsSlot = component.getPropsFromSlotId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const currentRepeaterValueId = component.getRepeatValue();
    const currentRepeatValue = getComponentRepeaterState(
        currentRepeaterValueId
    );

    /**
     * @type {string}
     *
     */
    // @ts-ignore
    const key = component.getCurrentKey() ?? '';

    /**
     * @type {string}
     *
     * @description
     * Set props.
     */
    // @ts-ignore
    const componentName = component.getComponentName();

    /**
     * @type {string|undefined}
     */
    const cleanProsId = propsId?.split(' ').join('');

    /**
     * @type {string|undefined}
     */
    const cleanProsFromSlot = propsSlot?.split(' ').join('');

    /**
     * @type {object}
     */
    const propsFromParent = getPropsFromParent(cleanProsId);

    /**
     * @type {object}
     */
    const propsFromSlot = getPropsFromParent(cleanProsFromSlot);

    /**
     * @type {object}
     *
     * @description
     * Set props.
     */
    const baseProps = { ...component.dataset };

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
        currentRepeatValue,
        parentId,
    };
};
