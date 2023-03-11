import { core } from '../../../mobbu';
import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';
import { createNavContainer } from './navContainer';
import { navScroller } from './navScroller';

/**
 * Navigation store utils.
 */
export const navigationStore = core.createStore({
    // NOOP for emit cloaseAll accordion item event.
    closeAllItems: () => {},

    // NOOP for emit refresh scroller event.
    refreshScroller: () => {},
});

/**
 * Init navigation module.
 */
export const createNavigation = async () => {
    const { hasContainer } = await createNavContainer();
    const { navCreated } = await navigation();
    if (!navCreated) return;

    navAccordion();
    if (hasContainer) navScroller();
};
