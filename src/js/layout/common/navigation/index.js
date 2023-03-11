import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';
import { navigationContainer } from './navContainer';
import { navigationScoller } from './navScroller';

/**
 * Init navigation module.
 */
export const createNavigation = async () => {
    const { hasContainer } = await navigationContainer();
    const { navCreated } = await navigation();
    if (!navCreated) return;

    navAccordion();
    if (hasContainer) navigationScoller();
};
