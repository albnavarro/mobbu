import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant.js';
import { getRepeatParent } from '../../modules/repeater/action/get-repeater-parent.js';
import { componentMap } from '../store.js';

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {any} obj.value
 * @returns {void}
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
 * Find first element children of rootNode that contains currentNode. Use to find repeater innerWrap.
 *
 * @param {object} params
 * @param {HTMLElement} params.rootNode
 * @param {HTMLElement | null} params.currentNode
 * @returns {HTMLElement | undefined}
 */
const getFirstChildOfElementParentOfElement = ({ rootNode, currentNode }) => {
    if (!currentNode || !rootNode.contains(currentNode)) return;
    if (currentNode.parentElement === rootNode) return currentNode;

    return getFirstChildOfElementParentOfElement({
        rootNode,
        currentNode: currentNode.parentElement,
    });
};

/**
 * Find Dom element that container firstRepeaterElement.
 *
 * @param {object} obj
 * @param {HTMLElement} obj.rootNode
 * @param {HTMLElement} obj.node
 * @returns {HTMLElement | Element | undefined}
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
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {import('../../modules/repeater/type').CurrentRepeaterState}
 */
export const getRepeaterStateById = ({ id = '' }) => {
    if (!id || id === '') return DEFAULT_CURRENT_REPEATER_STATE;

    const item = componentMap.get(id);
    const currentRepeaterState = item?.currentRepeaterState;

    if (!currentRepeaterState) return DEFAULT_CURRENT_REPEATER_STATE;
    return currentRepeaterState;
};

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {string}
 */
export const getRepeaterPropBind = ({ id = '' }) => {
    if (!id || id === '') return '';

    const item = componentMap.get(id);
    const repeatPropBind = item?.repeatPropBind;

    if (!repeatPropBind) return '';

    return repeatPropBind;
};

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {HTMLElement | Element} obj.element
 * @returns {void}
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
 * @param {object} obj
 * @param {string | undefined} obj.id
 * @returns {HTMLElement | Element | undefined}
 */
export const getRepeaterInnerWrap = ({ id }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const repeaterInnerWrap = item?.repeaterInnerWrap;
    return repeaterInnerWrap;
};
