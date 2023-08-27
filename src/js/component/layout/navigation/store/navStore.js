import { core } from '../../../../mobbu';

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
