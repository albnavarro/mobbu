import { debugFilterListName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {object} params
 * @param {string} params.testString
 * @param {boolean} params.setFocus
 */
export const refreshFilterList = ({ testString, setFocus = false }) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugFilterListType>} */
    const methods = MobJs.useMethodByName(debugFilterListName);
    methods?.refreshList?.({ testString, setFocus });
};
