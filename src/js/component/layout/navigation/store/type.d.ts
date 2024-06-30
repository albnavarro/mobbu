export type navigationStoreProps =
    | 'closeAllAccordion'
    | 'refreshScroller'
    | 'openNavigation'
    | 'closeNavigation'
    | 'goToTop'
    | 'activeSection'
    | 'navigationIsOpen';

export interface NavigationStore {
    closeAllAccordion: () => void;
    refreshScroller: () => void;
    openNavigation: () => void;
    goToTop: () => void;
    activeSection: string;
    navigationIsOpen: boolean;
}
