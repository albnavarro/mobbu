import { createComponent } from '../../../mobjs';
import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';
import { NavigationLabel } from './navigationLabel';
import { NavigationSubmenu } from './navigationSubmenu';

export const navigationComponentDef = createComponent({
    name: 'mob-navigation-container',
    component: NavigationContainer,
    isolateOnMount: true,
    isolateCreation: true,
});

export const navigationDef = createComponent({
    name: 'mob-navigation',
    component: Navigation,
    exportState: ['currentAccordionId'],
    state: {
        currentAccordionId: () => ({
            value: -1,
            type: Number,
        }),
    },
});

export const navigationSubmenuDef = createComponent({
    name: 'mob-navigation-submenu',
    component: NavigationSubmenu,
    isolateOnMount: true,
    isolateCreation: true,
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
});

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
    exportState: ['label'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
    },
});
