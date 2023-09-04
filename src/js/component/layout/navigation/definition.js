import { createComponent } from '../../../mobjs';
import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';
import { NavigationSubmenu } from './navigationSubmenu';

export const navigationComponentDef = createComponent({
    name: 'NavigationContainer',
    component: NavigationContainer,
    asyncLoading: true,
});

export const navigationDef = createComponent({
    name: 'Navigation',
    component: Navigation,
    state: {
        currentAccordionId: () => ({
            value: -1,
            type: Number,
        }),
    },
});

export const navigationSubmenuDef = createComponent({
    name: 'NavigationSubmenu',
    component: NavigationSubmenu,
    asyncLoading: true,
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
    name: 'NavigationButton',
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
