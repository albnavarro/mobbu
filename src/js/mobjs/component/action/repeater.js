// @ts-check

import {
    ATTR_REPEATER_CONTEXT,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant.js';
import { getRepeatParent } from '../../modules/repeater/index.js';
import { queryAllFutureComponent } from '../../query/queryAllFutureComponent.js';
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

    return [...rootNode.children].find(
        (child) => child.contains(node) && child !== node
    );
};

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setIsRepeaterFirstChildNode = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, {
        ...item,
        isRepeaterFirstChildNode: true,
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
    return currentRepeaterState;
};

/**
 *
 * @param {object} param
 * @param {import('../../webComponent/type.js').userComponent|HTMLElement} param.element
 * @param {string} param.id
 * @return { void }
 *
 * @description
 * Get children of isRepeaterFirstChildNode that is not isRepeaterFirstChildNode
 * isRepeaterFirstChildNode === getComponentRepeatId() value.
 *
 * Teorically if child sf second isRepeaterFirstChildNode is marked.
 * The context value is updated when inner isRepeaterFirstChildNode is parsed.
 * tocheck.
 */
export const setRepeaterContext = ({ element, id }) => {
    const children = queryAllFutureComponent(element, false);

    /**
     * Filter not isRepeaterFirstChildNode
     */
    const childrenFiltered = children.filter((child) => {
        const currentRepeatId = child.getComponentRepeatId();
        return !currentRepeatId || currentRepeatId === '';
    });

    /**
     * Set repeat context
     */
    childrenFiltered.forEach((child) => {
        child.setAttribute(ATTR_REPEATER_CONTEXT, id);
    });
};

/**
 *
 * @param {object} param
 * @param {string} param.contextId
 * @return { string[] }
 *
 * @description
 */
export const getComponentIdByRepeatercontext = ({ contextId }) => {
    return [...componentMap.values()]
        .filter(({ repeaterContextId }) => repeaterContextId === contextId)
        .map(({ id }) => id);
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
