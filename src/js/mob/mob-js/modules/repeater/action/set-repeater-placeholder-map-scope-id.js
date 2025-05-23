// @ts-check

import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * Is the first call to populate placeholderMap. Initialize all the props.
 *
 * Here we have scopeId, content is just render from getParamsForComponent() element: we will wait the end of parse.
 * initialize: we will wait fire function.
 *
 * @param {object} params
 * @param {string} params.repeatId - RepeatId
 * @param {string} params.scopeId - ScopedId
 * @returns {void}
 */

export const setRepeaterPlaceholderMapScopeId = ({ repeatId, scopeId }) => {
    repeatIdPlaceHolderMap.set(repeatId, {
        element: undefined,
        initialized: false,
        scopeId,
        key: '',
        children: [],
    });
};
