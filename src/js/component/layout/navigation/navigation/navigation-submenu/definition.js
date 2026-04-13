import { MobJs } from '@mobJs';
import { NavigationSubmenuFn } from './navigation-submenu';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const NavigationSubmenu = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationSubmenuType>} */
    ({
        tag: 'mob-navigation-submenu',
        component: NavigationSubmenuFn,
        props: {
            callback: () => ({
                value: () => {},
                type: Function,
            }),
            headerButton: () => ({
                value: {},
                type: 'Any',
            }),
            children: () => ({
                value: [],
                type: Array,
            }),
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
