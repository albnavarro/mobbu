// @ts-check

import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant.js';
import { getRepeatParent } from '../../modules/repeater/action/getRepeaterParent.js';
import { componentMap } from '../store.js';

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {any} obj.value
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setRepeaterStateById = ({ id = '', value }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, {
        ...item,
        currentRepeaterState: value,
    });
};

/**
 * @description
 * Find first element children of rootNode that contains currentNode.
 * Use to find repeater innerWrap.
 *
 * @param {object} params
 * @param {HTMLElement} params.rootNode
 * @param {HTMLElement} params.currentNode
 * @returns {HTMLElement|undefined}
 */
const getFirstChildOfElementParentOfElement = ({ rootNode, currentNode }) => {
    if (!rootNode.contains(currentNode)) return;
    if (currentNode.parentElement === rootNode) return currentNode;

    return getFirstChildOfElementParentOfElement({
        rootNode,
        currentNode: currentNode.parentElement,
    });
};

/**
 *
 * @param {object} obj
 * @param {HTMLElement} obj.rootNode
 * @param {HTMLElement} obj.node
 * @return {HTMLElement|Element|undefined}
 *
 * @description
 * Find Dom element that container firstRepeaterElement.
 */
export const findFirstRepeaterElementWrap = ({ rootNode, node }) => {
    if (!rootNode) return;

    // return [...rootNode.children].find(
    //     (child) => child.contains(node) && child !== node
    // );

    return getFirstChildOfElementParentOfElement({
        rootNode,
        currentNode: node.parentElement,
    });
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @return {import('../../modules/repeater/type.js').currentRepeaterState}
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getRepeaterStateById = ({ id = '' }) => {
    if (!id || id === '') return DEFAULT_CURRENT_REPEATER_STATE;

    const item = componentMap.get(id);
    const currentRepeaterState = item?.currentRepeaterState;

    if (!currentRepeaterState) return DEFAULT_CURRENT_REPEATER_STATE;
    return currentRepeaterState;
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @return {string}
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const getRepeaterPropBind = ({ id = '' }) => {
    if (!id || id === '') return '';

    const item = componentMap.get(id);
    const repeatPropBind = item?.repeatPropBind;

    if (!repeatPropBind) return '';

    return repeatPropBind;
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {HTMLElement|Element} obj.element
 * @returns{void}
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setRepeaterInnerWrap = ({ id = '', repeatId = '', element }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    const repeaterParentElement = getRepeatParent({
        id: repeatId,
    });

    const elementWrapper = findFirstRepeaterElementWrap({
        rootNode: /** @type {HTMLElement} */ (repeaterParentElement),
        node: /** @type {HTMLElement} */ (element),
    });

    componentMap.set(id, {
        ...item,
        repeaterInnerWrap: elementWrapper,
    });
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @return {HTMLElement|Element|undefined}
 *
 * @description
 */
export const getRepeaterInnerWrap = ({ id }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const repeaterInnerWrap = item?.repeaterInnerWrap;
    return repeaterInnerWrap;
};
