import { mobNavigationName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {{ fireCallback?: boolean }} arg0
 */
export const closeAllNavAccordion = ({ fireCallback = true } = {}) => {
    /** @type {import('@mobJsType').UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName(mobNavigationName);
    mainNavigationMethods?.closeAllAccordion({ fireCallback });
};
