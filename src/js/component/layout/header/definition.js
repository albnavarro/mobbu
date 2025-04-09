//@ts-check

import { MobJs } from '@mobJs';
import { HeaderFn } from './header';
import { HeadernavFn } from './header-nav';
import { HeaderToggleFn } from './header-toggle';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const HeaderNav = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        name: 'mob-header-nav',
        component: HeadernavFn,
    })
);

export const HeaderToggle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderToggle>} */
    ({
        name: 'mob-header-toggle',
        component: HeaderToggleFn,
        state: {
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const Header = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Header>} */
    ({
        name: 'mob-header',
        component: HeaderFn,
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [HeaderNav, HeaderToggle],
    })
);
