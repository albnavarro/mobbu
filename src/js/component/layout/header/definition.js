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
    /** @type {CreateComponentParams<{}>} */
    ({
        name: 'mob-header-toggle',
        component: HeaderToggleFn,
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
