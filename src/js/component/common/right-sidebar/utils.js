import { rightSidebarName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {import('@commonComponent/right-sidebar/type').RightSideBarList[]} [data]
 */
export const updateRightSidebarList = (data) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('@commonComponent/right-sidebar/type').RightSidebar>}
     */
    const navContainerMethods = MobJs.useMethodByName(rightSidebarName);
    navContainerMethods?.updateList(data ?? []);
};
