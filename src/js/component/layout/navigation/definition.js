//@ts-check

import { createComponent } from '../../../mobjs';
import { NavigationContainerFn } from './navContainer';
import { NavigationFn } from './navigation';
import { NavigationButtonFn } from './navigationButton';
import { NavigationLabelFn } from './navigationLabel';
import { NavigationSubmenuFn } from './navigationSubmenu';

export const NavigationButton = createComponent({
    name: 'mob-navigation-button',
    component: NavigationButtonFn,
    exportState: [
        'label',
        'url',
        'arrowClass',
        'subMenuClass',
        'fireRoute',
        'callback',
        'isOpen',
        'scrollToSection',
        'activeId',
    ],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        url: () => ({
            value: '',
            type: String,
        }),
        activeId: () => ({
            value: -1,
            type: Number,
        }),
        scrollToSection: () => ({
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
    },
});

export const NavigationLabel = createComponent({
    name: 'mob-navigation-label',
    component: NavigationLabelFn,
    exportState: ['label', 'sectioName'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        sectioName: () => ({
            value: '',
            type: String,
        }),
    },
});

export const NavigationSubmenu = createComponent({
    name: 'mob-navigation-submenu',
    component: NavigationSubmenuFn,
    exportState: ['children', 'headerButton', 'isOpen', 'callback'],
    state: {
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
});

export const Navigation = createComponent({
    name: 'mob-navigation',
    component: NavigationFn,
    exportState: ['currentAccordionId'],
    state: {
        currentAccordionId: () => ({
            value: -1,
            type: Number,
            skipEqual: false,
        }),
    },
    child: [NavigationLabel, NavigationSubmenu, NavigationButton],
});

export const NavigationContainer = createComponent({
    name: 'mob-navigation-container',
    component: NavigationContainerFn,
    child: [Navigation],
});
