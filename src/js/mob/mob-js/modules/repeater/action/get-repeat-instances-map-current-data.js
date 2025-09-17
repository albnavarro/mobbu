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
 * @returns {any[]}
 */

export const getRepeaterInstancesCurrentData = ({ repeatId }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return [];

    return item.currentData;
};
