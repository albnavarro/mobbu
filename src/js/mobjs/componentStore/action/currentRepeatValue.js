// @ts-check

import {
    ATTR_REPEATER_CONTEXT,
    DEFAULT_CURRENT_REPEATER_STATE,
} from '../../constant.js';
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
 * @return { import('../../temporaryData/currentRepeaterItemValue/type.js').currentRepeaterState }
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
 */
export const setRepeaterContext = ({ element, id }) => {
    const children = queryAllFutureComponent(element, false);

    children.forEach((child) => {
        child.setAttribute(ATTR_REPEATER_CONTEXT, id);
    });
};
