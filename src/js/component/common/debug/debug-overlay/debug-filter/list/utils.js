import { debugFilterListName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {string} testString
 */
export const refreshFilterList = (testString) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugFilterList>} */
    const methods = MobJs.useMethodByName(debugFilterListName);
    methods?.refreshList?.({ testString });
};
