import { sideBarLinksName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @import {UseMethodByName} from '@mobJsType'
 */

/**
 * @param {boolean} visible
 */
export const openSideBarLinkTablet = (visible) => {
    /** @type {UseMethodByName<import('./type').SideBarLinks>} */
    const methods = MobJs.useMethodByName(sideBarLinksName);
    methods.toggleTablet(visible);
};

/**
 * @returns {HTMLElement}
 */
export const getSideBarLinkRoot = () => {
    /** @type {UseMethodByName<import('./type').SideBarLinks>} */
    const methods = MobJs.useMethodByName(sideBarLinksName);
    return methods.getRoot();
};
