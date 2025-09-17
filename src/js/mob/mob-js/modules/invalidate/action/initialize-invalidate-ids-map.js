// @ts-check

import { invalidateIdsMap } from '../invalidate-ids-map';

/**
 * Is the first call to populate placeholderMap. Initialize all the props.
 *
 * Here we have scopeId, content is just render from getParamsForComponent() element: we will wait the end of parse.
 * initialize: we will wait fire function.
 *
 * @param {object} params
 * @param {string} params.invalidateId
 * @param {string} params.scopeId
 * @returns {void}
 */

export const initializeInvalidateIdsMap = ({ invalidateId, scopeId }) => {
    const item = invalidateIdsMap.get(scopeId) ?? [];
    invalidateIdsMap.set(scopeId, [...item, { invalidateId }]);
};
