import { CodeButton } from '../component/code/codeButton';
import { Headernav } from '../component/header/headernav';
import { TestComponent } from '../component/test/testComponent';
import { TestComponent2 } from '../component/test/testComponent2';
import { NavigationContainer } from '../component/navigation/navContainer';
import { Navigation } from '../component/navigation/navigation';
import { Header } from '../component/header/header';
import { Footer } from '../component/footer/footer';
import { NavigationButton } from '../component/navigation/navigationButton';

export const componentRegistered = {
    Header: {
        componentFunction: Header,
        componentParams: {},
    },
    Headernav: {
        componentFunction: Headernav,
        componentParams: {},
    },
    Footer: {
        componentFunction: Footer,
        componentParams: {},
    },
    NavigationContainer: {
        componentFunction: NavigationContainer,
        componentParams: {},
    },
    Navigation: {
        componentFunction: Navigation,
        componentParams: {},
    },
    NavigationButton: {
        componentFunction: NavigationButton,
        componentParams: {},
    },
    CodeButton: {
        componentFunction: CodeButton,
        componentParams: {},
    },
    TestComponent: {
        componentFunction: TestComponent,
        componentParams: {
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
        componentParams: {},
    },
};
