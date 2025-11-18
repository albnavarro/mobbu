import { MobJs } from '@mobJs';
import { NavigationSubmenuFn } from './navigation-submenu';
import { NavigationButton } from '../navigation-button/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const NavigationSubmenu = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationSubmenu>} */
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
        child: [NavigationButton],
    })
);
