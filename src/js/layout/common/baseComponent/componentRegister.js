import { CodeButton } from '../component/code/codeButton';
import { Headernav } from '../component/header/headernav';
import { TestComponent } from '../component/test/testComponent';
import { TestComponent2 } from '../component/test/testComponent2';
import { NavigationContainer } from '../component/navigation/navContainer';
import { Navigation } from '../component/navigation/navigation';
import { Header } from '../component/header/header';
import { Footer } from '../component/footer/footer';

export const componentRegistered = {
    Header: {
        componentFunction: Header,
        componentParams: {
            className: 'l-header',
            type: 'header',
        },
    },
    Headernav: {
        componentFunction: Headernav,
        componentParams: {
            className: 'l-header__sidenav',
            type: 'ul',
        },
    },
    Footer: {
        componentFunction: Footer,
        componentParams: {
            className: ['l-footer'],
            type: 'footer',
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
    CodeButton: {
        componentFunction: CodeButton,
        componentParams: {
            className: ['c-code-btn'],
            type: 'button',
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
};
