import { createComponent } from '../../../mobjs';
import { Header } from './header';
import { Headernav } from './headernav';
import { HeaderToggle } from './headerToggle';

export const headerComponentDef = createComponent({
    name: 'Header',
    component: Header,
});

export const headerNavComponentDef = createComponent({
    name: 'Headernav',
    component: Headernav,
});

export const headerToggleComponentDef = createComponent({
    name: 'HeaderToggle',
    component: HeaderToggle,
});
