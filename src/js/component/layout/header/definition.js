import { createComponentDefinition } from '../../../baseComponent/route/utils';
import { Header } from './header';
import { Headernav } from './headernav';
import { HeaderToggle } from './headerToggle';

export const headerComponentDef = createComponentDefinition({
    name: 'Header',
    component: Header,
});

export const headerNavComponentDef = createComponentDefinition({
    name: 'Headernav',
    component: Headernav,
});

export const headerToggleComponentDef = createComponentDefinition({
    name: 'HeaderToggle',
    component: HeaderToggle,
});
