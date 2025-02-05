//@ts-check

import { createComponent } from '../../../mobjs';
import { HeaderFn } from './header';
import { HeadernavFn } from './headernav';
import { HeaderToggleFn } from './headerToggle';

export const HeaderNav = createComponent({
    name: 'mob-header-nav',
    component: HeadernavFn,
});

export const HeaderToggle = createComponent({
    name: 'mob-header-toggle',
    component: HeaderToggleFn,
    state: {
        isOpen: () => ({
            value: false,
            type: Boolean,
        }),
    },
});

export const Header = createComponent({
    name: 'mob-header',
    component: HeaderFn,
    state: {
        infoIsOpen: () => ({
            value: false,
            type: Boolean,
        }),
        isNotHome: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [HeaderNav, HeaderToggle],
});
