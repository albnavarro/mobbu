import { createFooter } from './footer';
import { createHeader } from './header';
import { navigation } from './navigation';

export const initCommonModules = () => {
    createHeader();
    createFooter();
    navigation();
};
