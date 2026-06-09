import { sideBarLinksName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @returns {HTMLElement}
 */
export const getSideBarLinksRoot = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').SideBarLinks>} */
    const methods = MobJs.useMethodByName(sideBarLinksName);
    return methods?.getRoot() ?? document.createElement('div');
};
