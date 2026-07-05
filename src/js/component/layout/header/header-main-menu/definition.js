import { MobJs } from '@mobJs';
import { HeaderMainMenuFunction } from './header-main-menu';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HeaderMainMenu = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenu>} */
    ({
        tag: 'header-main-menu',
        component: HeaderMainMenuFunction,
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
