import { createFooter } from './commonPartials/footer';
import { createHeader } from './commonPartials/header';
import { createNavigation } from './navigation';

export const initCommonModules = () => {
    createHeader();
    createFooter();
    createNavigation();
};
