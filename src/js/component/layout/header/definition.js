import { MobJs } from '@mobJs';
import { HeaderFn } from './header';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

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
    })
);
