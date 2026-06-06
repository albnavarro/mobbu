import { docContainerName } from '@instanceName';
import { MobJs } from '@mobJs';

export const closeSidebarleft = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DocContainerType>} */
    const methods = MobJs.useMethodByName(docContainerName);
    methods?.closeSidebarLeft();
};
