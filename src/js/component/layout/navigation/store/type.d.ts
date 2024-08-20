export interface NavigationStore {
    refreshScroller: () => void;
    openNavigation: () => void;
    closeNavigation: () => void;
    activeSection: string;
    navigationIsOpen: boolean;
}
