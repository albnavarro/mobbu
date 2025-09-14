import { MobJs } from '@mobJs';
import { HeaderFn } from './header';
import { HeadernavFn } from './header-nav';
import { HeaderToggleFn } from './header-toggle';
import { Search } from '@commonComponent/search/cta-search/definition';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const HeaderNav = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'mob-header-nav',
        component: HeadernavFn,
        child: [Search],
    })
);

export const HeaderToggle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderToggle>} */
    ({
        tag: 'mob-header-toggle',
        component: HeaderToggleFn,
        bindStore: navigationStore,
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const Header = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Header>} */
    ({
        tag: 'mob-header',
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
