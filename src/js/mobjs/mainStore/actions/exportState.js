// @ts-check

import { mainStore } from '../mainStore';

/**
 * @param {Object} obj
 * @param {String} obj.componentName
 * @param {{string:any}|{}} obj.currentProps
 * @returns {{string:any}|{}}
 */
export const filterExportableStateFromObject = ({
    componentName,
    currentProps = {},
}) => {
    const { componentList } = mainStore.get();

    /**
     * @type {Array<String>}
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

/**
 * @param {Object} obj
 * @param {String} obj.componentName
 * @param {String} obj.propName
 * @returns {Boolean}
 */
export const checkIfStateIsExportable = ({ componentName, propName }) => {
    const { componentList } = mainStore.get();

    const exportableState =
        componentList?.[componentName]?.componentParams?.exportState ?? [];

    return exportableState.includes(propName);
};
