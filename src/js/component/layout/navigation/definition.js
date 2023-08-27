import { createComponentDefinition } from '../../../mobjs';
import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';

export const navigationComponentDef = createComponentDefinition({
    name: 'NavigationContainer',
    component: NavigationContainer,
});

export const navigationDef = createComponentDefinition({
    name: 'Navigation',
    component: Navigation,
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
