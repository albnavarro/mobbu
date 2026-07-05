import { docContainerName } from '@instanceName';
import { MobJs } from '@mobJs';

export const closeSidebarRight = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DocContainerType>} */
    const methods = MobJs.useMethodByName(docContainerName);
    methods?.closeSidebarRight();
};
