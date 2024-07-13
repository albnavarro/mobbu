// @ts-check

import { getComponentRepeaterState } from '../temporaryData/currentRepeaterItemValue';
import { getPropsFromParent } from '../temporaryData/staticProps';
import { filterExportableStateFromObject } from '../mainStore/actions/exportState';

/**
 * @param {object} obj
 * @param {import("../webComponent/type").userComponent} obj.element
 * @param {string|undefined} obj.parentIdForced
 * @returns {import('./type').componentDataType}
 *
 * @description
 * Create base DOM component from component tag.
 */
export const getParamsFromWebComponent = ({ element, parentIdForced }) => {
    const id = element.getId();
    const instanceName = element.getInstanceName();
    const parentIdFromWebComponent = element.getParentId();

    /**
     * First choice is parentId passed directly in webComponent
     * Second choice is parentId passed to initParseWatcher ( renderComponent: render component runtime ).
     *
     * After first level of Node will render, all childrn has the right parentID:
     * `addParentIdToFutureComponent({ element: newElement, id });`
     *
     * So after first level of node tree parentIdFromWebComponent always win.
     */
    const parentId =
        parentIdFromWebComponent && parentIdFromWebComponent.length > 0
            ? parentIdFromWebComponent
            : parentIdForced;

    const propsId = element.getStaticPropsId();
    const dynamicPropsId = element.getDynamicPropsid();
    const bindEventsId = element.getBindEventsId();
    const repeatPropBind = element.getRepeaterPropBind();
    const dynamicPropsIdFromSlot = element.getDynamicPropsFromSlotId();
    const propsSlot = element.getPropsFromSlotId();
    const currentRepeaterValueId = element.getRepeatValue();
    const currentRepeatValue = getComponentRepeaterState(
        currentRepeaterValueId
    );
    const componentRepeatId = element.getComponentRepeatId();
    const key = element.getCurrentKey() ?? '';
    const componentName = element.getComponentName();
    const cleanProsId = propsId?.split(' ').join('');
    const cleanProsFromSlot = propsSlot?.split(' ').join('');
    const propsFromParent = getPropsFromParent(cleanProsId);
    const propsFromSlot = getPropsFromParent(cleanProsFromSlot);
    const baseProps = { ...element.dataset };

    const repeaterContextvalue = element.getComponentRepeatContext();
    const isChildOfFirstRepeaterNode =
        repeaterContextvalue && repeaterContextvalue !== '' ? true : false;

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
        repeatPropBind,
        bindEventsId,
        currentRepeatValue,
        parentId,
        componentRepeatId,
        isChildOfFirstRepeaterNode,
    };
};
