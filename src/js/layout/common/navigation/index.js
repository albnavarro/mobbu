import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';
import { createNavContainer } from './navContainer';
import { navScroller } from './navScroller';

export const createNavigation = async () => {
    const { hasContainer } = await createNavContainer();
    const { navCreated } = await navigation();
    if (!navCreated) return;

    navAccordion();
    if (hasContainer) navScroller();
};
