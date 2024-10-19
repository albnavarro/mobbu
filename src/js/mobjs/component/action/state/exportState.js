// @ts-check

import { getComponentList } from '../../getComponentList';

/**
 * @param {object} obj
 * @param {string} obj.componentName
 * @param {{string:any}|{}} obj.currentProps
 * @returns {{string:any}|{}}
 */
export const filterExportableStateFromObject = ({
    componentName,
    currentProps = {},
}) => {
    const componentList = getComponentList();

    /**
     * @type {string[]}
     */
    const exportableState =
        componentList?.[componentName]?.componentParams?.exportState ?? [];

    return Object.entries(currentProps)
        .filter(([key]) => {
            return exportableState.includes(key);
        })
        .reduce((previous, current) => {
            const [key, value] = current;
            return { ...previous, [key]: value };
        }, {});
};
