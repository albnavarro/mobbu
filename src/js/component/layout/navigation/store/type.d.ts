export interface NavigationStore {
    closeAllAccordion: () => void;
    refreshScroller: () => void;
    openNavigation: () => void;
    closeNavigation: () => void;
    goToTop: () => void;
    activeSection: string;
    navigationIsOpen: boolean;
}
