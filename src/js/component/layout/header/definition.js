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
});

export const Header = createComponent({
    name: 'mob-header',
    component: HeaderFn,
    child: [HeaderNav, HeaderToggle],
});
