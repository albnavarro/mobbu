import { mobCore } from '../../../../mobCore';

/**
 * Navigation store utils.
 */
export const navigationStore = mobCore.createStore({
    closeAllAccordion: () => {},
    refreshScroller: () => {},
    openNavigation: () => {},
    closeNavigation: () => {},
    goToTop: () => {},
    activeSection: '',
    navigationIsOpen: () => ({
        value: false,
        type: Boolean,
    }),
});
