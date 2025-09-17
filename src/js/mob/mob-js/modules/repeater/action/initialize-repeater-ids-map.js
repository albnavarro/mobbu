// @ts-check

import { repeatIdsMap } from '../repeat-ids-map';

/**
 * Is the first call to populate placeholderMap. Initialize all the props.
 *
 * Here we have scopeId, content is just render from getParamsForComponent() element: we will wait the end of parse.
 * initialize: we will wait fire function.
 *
 * @param {object} params
 * @param {string} params.repeatId
 * @param {string} params.scopeId
 * @returns {void}
 */

export const initializeRepeaterIdsMap = ({ repeatId, scopeId }) => {
    const item = repeatIdsMap.get(scopeId) ?? [];
    repeatIdsMap.set(scopeId, [...item, { repeatId }]);
};
