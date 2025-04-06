// @ts-check

import { getComponentList } from '../../componentList';

/**
 * @param {object} obj
 * @param {string} obj.componentName
 * @param {string} obj.propName
 * @returns {boolean}
 */

export const checkIfStateIsExportable = ({ componentName, propName }) => {
    const componentList = getComponentList();

    const exportableState =
        componentList?.[componentName]?.componentParams?.exportState ?? [];

    return exportableState.includes(propName);
};
