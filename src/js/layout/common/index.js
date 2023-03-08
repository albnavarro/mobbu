import { createFooter } from './footer';
import { createHeader } from './header';
import { createNavigation } from './navigation';

export const initCommonModules = () => {
    createHeader();
    createFooter();
    createNavigation();
};
