// @ts-check

import { invalidateInstancesMap } from '../invalidate-id-instances-map';

/**
 * Is the first call to populate placeholderMap. Initialize all the props.
 *
 * Here we have scopeId, content is just render from getParamsForComponent() element: we will wait the end of parse.
 * initialize: we will wait fire function.
 *
 * @param {object} params
 * @param {string} params.invalidateId - InvalidateId
 * @param {string} params.scopeId - ScopeId
 * @returns {void}
 */

export const initializeInvalidateInstacesMap = ({ invalidateId, scopeId }) => {
    invalidateInstancesMap.set(invalidateId, {
        element: undefined,
        initialized: false,
        scopeId,
        fn: () => {},
        unsubscribe: [() => {}],
    });
};
