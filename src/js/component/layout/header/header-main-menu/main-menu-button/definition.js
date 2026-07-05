import { MobJs } from '@mobJs';
import { HeaderMainMenuButtonFunction } from './header-main-menu-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HeaderMainMenuButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderMainMenuButton>} */
    ({
        tag: 'header-main-menu-button',
        component: HeaderMainMenuButtonFunction,
        bindStore: MobJs.mainStore,
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
