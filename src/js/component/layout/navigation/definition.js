import { MobJs } from '@mobJs';
import { NavigationContainerFunction } from './nav-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const NavigationContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationContainer>} */
    ({
        tag: 'mob-navigation-container',
        component: NavigationContainerFunction,
        state: {
            isOpen: {
                __value: false,
                __type: Boolean,
            },
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
