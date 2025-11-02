import { MobJs } from '@mobJs';
import { NavigationContainerFn } from './nav-container';
import { NavigationFn } from './navigation';
import { NavigationButtonFn } from './navigation-button';
import { NavigationLabelFn } from './navigation-label';
import { NavigationSubmenuFn } from './navigation-submenu';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const NavigationButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationButton>} */
    ({
        tag: 'mob-navigation-button',
        component: NavigationButtonFn,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
                value: '',
                type: String,
            }),
            arrowClass: () => ({
                value: '',
                type: String,
            }),
            subMenuClass: () => ({
                value: '',
                type: String,
            }),
            fireRoute: () => ({
                value: true,
                type: Boolean,
            }),
            callback: () => ({
                value: () => {},
                type: Function,
            }),
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
            scrollToSection: () => ({
                value: '',
                type: String,
            }),
            activeId: () => ({
                value: -1,
                type: Number,
            }),
            forceChildren: () => ({
                value: [],
                type: Array,
            }),
        },
        state: {
            isCurrent: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const NavigationLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationLabel>} */
    ({
        tag: 'mob-navigation-label',
        component: NavigationLabelFn,
        bindStore: navigationStore,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            sectioName: () => ({
                value: '',
                type: String,
            }),
            hide: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

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

export const Navigation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Navigation>} */
    ({
        tag: 'mob-navigation',
        component: NavigationFn,
        state: {
            currentAccordionId: () => ({
                value: -1,
                type: Number,
                skipEqual: false,
            }),
        },
        child: [NavigationLabel, NavigationSubmenu, NavigationButton],
    })
);

export const NavigationContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationContainer>} */
    ({
        tag: 'mob-navigation-container',
        component: NavigationContainerFn,
        child: [Navigation],
        state: {
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
