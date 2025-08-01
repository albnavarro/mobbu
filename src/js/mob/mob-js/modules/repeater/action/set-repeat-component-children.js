import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * @param {object} params
 * @param {string} params.componentId
 * @param {string} params.repeatId
 * @returns {void}
 */
export const setRepeaterComponentChildren = ({ componentId, repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const { componentChildren } = item;

    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        componentChildren: [...componentChildren, componentId],
    });
};

/**
 * @param {object} params
 * @param {string} params.componentId
 * @param {string} params.repeatId
 * @returns {void}
 */
export const removeRepeaterComponentChildren = ({ componentId, repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const { componentChildren } = item;

    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        componentChildren: componentChildren.filter((id) => id !== componentId),
    });
};

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @returns {string[]}
 */
export const getRepeaterComponentChildren = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return [];

    const { componentChildren } = item;
    return componentChildren;
};

/**
 * @param {object} params
 * @param {string} params.repeatId
 * @returns {boolean}
 */
export const repeaterhasComponentChildren = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return false;

    const { componentChildren } = item;
    return componentChildren.length > 0;
};
