// @ts-check

import { repeatInstancesMap } from '../repeat-id-intances-map';

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

export const initializeRepeaterInstancesMap = ({ repeatId, scopeId }) => {
    repeatInstancesMap.set(repeatId, {
        element: undefined,
        initialized: false,
        scopeId,
        key: '',
        nativeDOMChildren: [],
        componentChildren: [],
        currentData: [],
        initialRenderWithoutSync: [],
        fn: () => {},
        unsubscribe: () => {},
    });
};
