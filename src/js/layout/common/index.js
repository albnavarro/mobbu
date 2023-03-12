import { createFooter } from './layout/footer';
import { createHeader } from './layout/header';
import { createNavigation } from './navigation';

export const initCommonModules = () => {
    createHeader();
    createFooter();
    createNavigation();
};
