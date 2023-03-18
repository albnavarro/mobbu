import { createNavigation } from './component/navigation';
import { createHeader } from './component/header';
import { createFooter } from './component/footer';

export const initCommonModules = () => {
    createHeader();
    createNavigation();
    createFooter();
};
