import { MobJs } from '@mobJs';
import { debugFilterListName } from 'src/js/component/instance-name';

/**
 * @param {string} testString
 */
export const refreshFilterList = (testString) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugFilterList>} */
    const methods = MobJs.useMethodByName(debugFilterListName);
    methods?.refreshList?.({ testString });
};
