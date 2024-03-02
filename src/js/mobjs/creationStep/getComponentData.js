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
export const getComponentData = ({ component }) => {
    /**
     * @type {String}
     *
     */
    // @ts-ignore
    const id = component.getId();

    /**
     * @type {String}
     */
    // @ts-ignore
    const instanceName = component.getInstanceName();

    /**
     * @type {String}
     */
    // @ts-ignore
    const parentId = component.getParentId();

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
    const currentRepeaterValueId = component.getRepeatValue();
    const currentRepeatValue = getComponentRepeaterState(
        currentRepeaterValueId
    );

    /**
     * @type {String}
     *
     */
    // @ts-ignore
    const key = component.getCurrentKey() ?? '';

    /**
     * @type {String}
     *
     * @description
     * Set props.
     */
    // @ts-ignore
    const componentName = component.getComponentName();

    /**
     * @type {String|undefined}
     */
    const cleanProsId = propsId?.split(' ').join('');

    /**
     * @type {String|undefined}
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
