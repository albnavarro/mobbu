import { createComponentDefinition } from '../../../mobjs';
import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';
import { NavigationSubmenu } from './navigationSubmenu';

export const navigationComponentDef = createComponentDefinition({
    name: 'NavigationContainer',
    component: NavigationContainer,
});

export const navigationDef = createComponentDefinition({
    name: 'Navigation',
    component: Navigation,
});

export const navigationSubmenuDef = createComponentDefinition({
    name: 'NavigationSubmenu',
    component: NavigationSubmenu,
    exportState: ['children', 'headerButton'],
    state: {
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

export const navigationButtonDef = createComponentDefinition({
    name: 'NavigationButton',
    component: NavigationButton,
    exportState: ['label', 'url', 'arrowClass', 'subMenuClass', 'fireRoute'],
    state: {
        label: '',
        url: '#',
        arrowClass: '',
        subMenuClass: '',
        fireRoute: true,
    },
});
