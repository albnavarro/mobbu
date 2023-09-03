import { core } from '../../../../mobMotion';

/**
 * Navigation store utils.
 */
export const navigationStore = core.createStore({
    closeAllAccordion: () => {},
    refreshScroller: () => {},
    openNavigation: () => {},
    closeNavigation: () => {},
    goToTop: () => {},
    navigationIsOpen: () => ({
        value: false,
        type: Boolean,
    }),
});
