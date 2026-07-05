import { MobJs } from '@mobJs';
import { HeaderFunction } from './header';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Header = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Header>} */
    ({
        tag: 'mob-header',
        component: HeaderFunction,
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
