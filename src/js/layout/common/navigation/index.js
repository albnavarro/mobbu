import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';
import { navigationContainer } from './navContainer';
import { navigationScoller } from './navScroller';

/**
 * Init navigation module.
 */
export const createNavigation = async () => {
    // Create container if defined.
    const { hasContainer } = await navigationContainer();

    // Create navigation with or without container.
    const { navCreated } = await navigation();
    if (!navCreated) return;

    // Create accordion.
    navAccordion();

    // If there is a container implement scroller.
    if (hasContainer) navigationScoller();
};
