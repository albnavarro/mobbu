import { getStateById } from '../../../component/action/state/get-state-by-id';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @param {string} params.id
 * @param {string} params.observe
 * @returns {void}
 */
export const setRepeaterChild = ({ repeatId, id, observe }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const { element } = item;
    if (!element) return;

    /**
     * Fall back for repeater without component inside.
     */
    const children = /** @type {HTMLElement[]} */ ([...element.children]);
    const state = getStateById(id);
    const stateByProp = state[observe];

    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        key: observe,
        children: children.map((child, index) => {
            return { index, value: stateByProp[index], element: child };
        }),
    });
};

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @returns {{ index: number; value: any; element: HTMLElement }[]}
 */
export const getRepeaterChild = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return [];

    const { children } = item;
    return children;
};
