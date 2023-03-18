import { createFooter } from './layout/footer';
import { createHeader } from './layout/header';
import { createNavigation } from './component/navigation';

export const initCommonModules = () => {
    createHeader();
    createFooter();
    createNavigation();
};
