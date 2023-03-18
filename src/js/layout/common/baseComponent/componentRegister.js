import { CodeButton } from '../component/code/codeButton';
import { Headernav } from '../component/headernav/headernav';
import { TestComponent } from '../component/test/testComponent';
import { TestComponent2 } from '../component/test/testComponent2';
import { NavigationContainer } from '../navigation/navContainer';
import { Navigation } from '../navigation/createNavigation';

export const componentRegistered = {
    CodeButton: {
        componentFunction: CodeButton,
        componentParams: {
            className: ['c-code-btn'],
            type: 'button',
        },
    },
    Headernav: {
        componentFunction: Headernav,
        componentParams: {
            className: 'l-header__sidenav',
            type: 'ul',
        },
    },
    TestComponent: {
        componentFunction: TestComponent,
        componentParams: {
            className: ['c-test-comp'],
            type: 'button',
            state: {
                stato1: () => ({
                    value: 0,
                    type: Number,
                }),
                stato2: () => ({
                    value: 0,
                    type: Number,
                }),
            },
        },
    },
    TestComponent2: {
        componentFunction: TestComponent2,
        componentParams: {
            className: ['c-test-comp__inner'],
            type: 'span',
        },
    },
    NavigationContainer: {
        componentFunction: NavigationContainer,
        componentParams: {
            className: ['l-navcontainer'],
            type: 'div',
        },
    },
    Navigation: {
        componentFunction: Navigation,
        componentParams: {
            className: ['l-navigation'],
            type: 'nav',
        },
    },
};
