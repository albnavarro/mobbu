import { getStateById } from '../../../component/action/state/get-state-by-id';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @param {string} params.id
 * @returns {void}
 */
export const setRepeaterNativeDOMChildren = ({ repeatId, id }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    const { element, observed } = item;
    if (!element) return;

    /**
     * Fall back for repeater without component inside.
     */
    const children = /** @type {HTMLElement[]} */ ([...element.children]);
    const state = getStateById(id);
    const stateByProp = state[observed];

    repeatInstancesMap.set(repeatId, {
        ...item,
        nativeDOMChildren: children.map((child, index) => {
            return { index, value: stateByProp[index], element: child };
        }),
    });
};

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @returns {{ index: number; value: any; element: HTMLElement }[]}
 */
export const getRepeaterNativeDOMChildren = ({ repeatId }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return [];

    const { nativeDOMChildren } = item;
    return nativeDOMChildren;
};
