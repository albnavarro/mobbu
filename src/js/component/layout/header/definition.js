import { createComponent } from '../../../mobjs';
import { Header } from './header';
import { Headernav } from './headernav';
import { HeaderToggle } from './headerToggle';

export const headerNavComponentDef = createComponent({
    name: 'mob-header-nav',
    component: Headernav,
});

export const headerToggleComponentDef = createComponent({
    name: 'mob-header-toggle',
    component: HeaderToggle,
});

export const headerComponentDef = createComponent({
    name: 'mob-header',
    component: Header,
    child: [headerNavComponentDef, headerToggleComponentDef],
});
