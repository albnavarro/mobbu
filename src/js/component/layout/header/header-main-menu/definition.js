import { MobJs } from '@mobJs';
import { HeaderMainMenuButtonFn } from './header-main-menu-button';
import { headerMainMenuFn } from './header-main-menu';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderMainMenuButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenuButton>} */
    ({
        tag: 'header-main-menu-button',
        component: HeaderMainMenuButtonFn,
        bindStore: navigationStore,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            section: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const HeaderMainMenu = MobJs.createComponent({
    tag: 'header-main-menu',
    component: headerMainMenuFn,
    child: [HeaderMainMenuButton],
    state: {
        isMounted: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
