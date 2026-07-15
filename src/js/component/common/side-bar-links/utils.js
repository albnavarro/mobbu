import { sidebarLinksName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @returns {HTMLElement}
 */
export const getSidebarLinksRoot = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').SidebarLinks>} */
    const methods = MobJs.useMethodByName(sidebarLinksName);
    return methods?.getRoot() ?? document.createElement('div');
};
