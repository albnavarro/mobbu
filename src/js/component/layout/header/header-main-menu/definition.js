import { MobJs } from '@mobJs';
import { headerMainMenuFn } from './header-main-menu';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderMainMenu = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenu>} */
    ({
        tag: 'header-main-menu',
        component: headerMainMenuFn,
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
