import { mobNavigationContainerName } from '@instanceName';
import { MobJs } from '@mobJs';

export const scrollToTopNav = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('../navigation/type').NavigationContainer>} */
    const navContainerMethods = MobJs.useMethodByName(
        mobNavigationContainerName
    );

    navContainerMethods?.scrollTop();
};

export const refreshNavigationScroller = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').NavigationContainer>} */
    const methods = MobJs.useMethodByName(mobNavigationContainerName);
    methods?.refresh();
};
