import { getComponentList } from '../../component-list';

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

/**
 * @param {object} obj
 * @param {string} obj.componentName
 * @returns {string[]}
 */
export const getExportableState = ({ componentName }) => {
    const componentList = getComponentList();

    return componentList?.[componentName]?.componentParams?.exportState ?? [];
};
