import { NavigationContainer } from './navContainer';
import { Navigation } from './navigation';
import { NavigationButton } from './navigationButton';

export const navigationComponentDef = {
    NavigationContainer: {
        componentFunction: NavigationContainer,
        componentParams: {
            props: {},
        },
    },
    Navigation: {
        componentFunction: Navigation,
        componentParams: {
            props: {},
        },
    },
    NavigationButton: {
        componentFunction: NavigationButton,
        componentParams: {
            props: {
                label: '',
                url: '#',
                arrowClass: '',
                subMenuClass: '',
                fireRoute: true,
            },
        },
    },
};
