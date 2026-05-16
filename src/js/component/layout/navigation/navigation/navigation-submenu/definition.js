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
            callback: {
                __value: () => {},
                __type: Function,
            },
            headerButton: {
                __value: {},
                __type: 'Any',
            },
            children: {
                __value: [],
                __type: Array,
            },
            isOpen: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
