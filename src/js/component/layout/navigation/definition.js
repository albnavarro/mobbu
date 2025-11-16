import { MobJs } from '@mobJs';
import { NavigationContainerFn } from './nav-container';
import { Navigation } from './navigation/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const NavigationContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationContainer>} */
    ({
        tag: 'mob-navigation-container',
        component: NavigationContainerFn,
        child: [Navigation],
        state: {
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
