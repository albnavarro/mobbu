import { CodeButton } from '../component/code/codeButton';
import { Headernav } from '../component/headernav/headernav';
import { TestComponent } from '../component/test/testComponent';
import { TestComponent2 } from '../component/test/testComponent2';

export const componentRegistered = {
    code_button: {
        fn: CodeButton,
        params: {
            className: ['c-code-btn'],
            type: 'button',
        },
    },
    header_nav: {
        fn: Headernav,
        params: {
            className: 'l-header__sidenav',
            type: 'ul',
        },
    },
    test_component: {
        fn: TestComponent,
        params: {
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
    test_component_2: {
        fn: TestComponent2,
        params: {
            className: ['c-test-comp__inner'],
            type: 'span',
        },
    },
};
