import { mobCore } from '../../../../mobCore';

/**
 * Navigation store utils.
 */
export const navigationStore = mobCore.createStore({
    currentButtonId: '',
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
