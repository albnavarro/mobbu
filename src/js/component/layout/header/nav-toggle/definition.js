import { MobJs } from '@mobJs';
import { HeaderToggleFn } from './header-toggle';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

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
