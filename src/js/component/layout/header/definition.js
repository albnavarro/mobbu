//@ts-check

import { createComponent } from '../../../mobjs';
import { HeaderFn } from './header';
import { HeadernavFn } from './headernav';
import { HeaderToggleFn } from './headerToggle';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const HeaderNav = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'mob-header-nav',
        component: HeadernavFn,
    })
);

export const HeaderToggle = createComponent(
    /** @type{CreateComponentParams<import('./type').HeaderToggle>} */
    ({
        name: 'mob-header-toggle',
        component: HeaderToggleFn,
        state: {
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);

export const Header = createComponent(
    /** @type{CreateComponentParams<import('./type').Header>} */
    ({
        name: 'mob-header',
        component: HeaderFn,
        state: {
            isNotHome: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [HeaderNav, HeaderToggle],
    })
);
