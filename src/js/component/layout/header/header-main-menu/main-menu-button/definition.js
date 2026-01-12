import { MobJs } from '@mobJs';
import { HeaderMainMenuButtonFn } from './header-main-menu-button';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderMainMenuButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenuButton>} */
    ({
        tag: 'header-main-menu-button',
        component: HeaderMainMenuButtonFn,
        bindStore: navigationStore,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            section: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
