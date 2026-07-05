import { MobJs } from '@mobJs';
import { HeaderToggleFunction } from './header-toggle';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HeaderToggle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HeaderToggle>} */
    ({
        tag: 'mob-header-toggle',
        component: HeaderToggleFunction,
        bindStore: navigationStore,
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
