import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';
import { createNavContainer } from './navContainer';

export const createNavigation = async () => {
    await createNavContainer();
    const { navCreated } = await navigation();
    if (!navCreated) return;

    navAccordion();
};
