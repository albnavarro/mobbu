import { createComponent } from '../../../mobjs';
import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';
import { NavigationLabel } from './navigationLabel';
import { NavigationSubmenu } from './navigationSubmenu';

export const navigationButtonDef = createComponent({
    name: 'mob-navigation-button',
    type: 'button',
    component: NavigationButton,
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

export const navigationLabelDef = createComponent({
    name: 'mob-navigation-label',
    component: NavigationLabel,
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

export const navigationSubmenuDef = createComponent({
    name: 'mob-navigation-submenu',
    component: NavigationSubmenu,
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
    child: [navigationButtonDef],
});

export const navigationDef = createComponent({
    name: 'mob-navigation',
    component: Navigation,
    exportState: ['currentAccordionId'],
    state: {
        currentAccordionId: () => ({
            value: -1,
            type: Number,
            skipEqual: false,
        }),
    },
    child: [navigationLabelDef, navigationSubmenuDef, navigationButtonDef],
});

export const navigationComponentDef = createComponent({
    name: 'mob-navigation-container',
    component: NavigationContainer,
    child: [navigationDef],
});
