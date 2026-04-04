import { leftSidebarName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {import('@commonComponent/left-sidebar/type').LeftSideBarList[]} [data]
 */
export const updateLeftSidebarList = (data) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('@commonComponent/left-sidebar/type').LeftSidebar>}
     */
    const navContainerMethods = MobJs.useMethodByName(leftSidebarName);
    navContainerMethods?.updateList(data ?? []);
};
