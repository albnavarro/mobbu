import { mobCore } from '../../../../mobCore';

/**
 * @description
 * Navigation store utils.
 *
 * @type {import('../../../../mobCore/store/type').mobStore<import('./type').navigationStoreProps>}
 */
export const navigationStore = mobCore.createStore({
    closeAllAccordion: () => {},
    refreshScroller: () => {},
    openNavigation: () => {},
    closeNavigation: () => {},
    goToTop: () => {},
    activeSection: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    navigationIsOpen: () => ({
        value: false,
        type: Boolean,
    }),
});
