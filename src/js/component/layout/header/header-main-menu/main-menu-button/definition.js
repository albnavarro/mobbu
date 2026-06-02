import { MobJs } from '@mobJs';
import { HeaderMainMenuButtonFn } from './header-main-menu-button';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HeaderMainMenuButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenuButton>} */
    ({
        tag: 'header-main-menu-button',
        component: HeaderMainMenuButtonFn,
        bindStore: navigationStore,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            section: {
                __value: '',
                __type: String,
            },
            url: {
                __value: '',
                __type: String,
            },
        },
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
