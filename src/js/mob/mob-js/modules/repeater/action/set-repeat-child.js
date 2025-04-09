import { getStateById } from '../../../component/action/state/get-state-by-id';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @param {string} params.id
 * @param {string} params.bind
 * @returns {void}
 */
export const setRepeaterChild = ({ repeatId, id, bind }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const { element } = item;
    if (!element) return;

    /**
     * Fall back for repeater without component inside.
     */
    const children = /** @type {HTMLElement[]} */ ([...element.children]);
    const state = getStateById(id);
    const stateByProp = state[bind];

    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        key: bind,
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
