import { MobJs } from '@mobJs';
import { NavigationFn } from './navigation';
import { NavigationLabel } from './navigation-label/definition';
import { NavigationSubmenu } from './navigation-submenu/definition';
import { NavigationButton } from './navigation-button/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */
export const Navigation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Navigation>} */
    ({
        tag: 'mob-navigation',
        component: NavigationFn,
        state: {
            currentAccordionId: () => ({
                value: -1,
                type: Number,
                skipEqual: false,
            }),
        },
        child: [NavigationLabel, NavigationSubmenu, NavigationButton],
    })
);
