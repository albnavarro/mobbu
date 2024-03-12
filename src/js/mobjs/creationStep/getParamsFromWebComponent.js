// @ts-check

import { getComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { getPropsFromParent } from '../temporaryData/staticProps';
import { filterExportableStateFromObject } from '../mainStore/actions/exportState';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @returns {import('./type').componentDataType}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const getParamsFromWebComponent = ({ element }) => {
    /**
     * @type {string}
     *
     */
    // @ts-ignore
    const id = element.getId();

    /**
     * @type {string}
     */
    // @ts-ignore
    const instanceName = element.getInstanceName();

    /**
     * @type {string}
     */
    // @ts-ignore
    const parentId = element.getParentId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const propsId = element.getStaticPropsId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const dynamicPropsId = element.getDynamicPropsid();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const bindEventsId = element.getBindEventsId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const dynamicPropsIdFromSlot = element.getDynamicPropsFromSlotId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const propsSlot = element.getPropsFromSlotId();

    /**
     * @type {string|undefined}
     */
    // @ts-ignore
    const currentRepeaterValueId = element.getRepeatValue();
    const currentRepeatValue = getComponentRepeaterState(
        currentRepeaterValueId
    );

    /**
     * @type {string}
     *
     */
    // @ts-ignore
    const key = element.getCurrentKey() ?? '';

    /**
     * @type {string}
     *
     * @description
     * Set props.
     */
    // @ts-ignore
    const componentName = element.getComponentName();

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
    const baseProps = { ...element.dataset };

    return {
        element,
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
