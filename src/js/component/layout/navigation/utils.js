import { MobJs } from '@mobJs';
import {
    mobNavigationContainerName,
    mobNavigationName,
} from '../../instance-name';

/**
 * @param {{ fireCallback?: boolean }} arg0
 */
export const closeAllNavAccordion = ({ fireCallback = true } = {}) => {
    /** @type {import('@mobJsType').UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName(mobNavigationName);
    mainNavigationMethods?.closeAllAccordion({ fireCallback });
};

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
