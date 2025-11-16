import { MobJs } from '@mobJs';
import { mobNavigationName } from 'src/js/component/instance-name';

/**
 * @param {{ fireCallback?: boolean }} arg0
 */
export const closeAllNavAccordion = ({ fireCallback = true } = {}) => {
    /** @type {import('@mobJsType').UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName(mobNavigationName);
    mainNavigationMethods?.closeAllAccordion({ fireCallback });
};
