export interface NavigationStore {
    refreshScroller: () => void;
    openNavigation: () => void;
    closeNavigation: () => void;
    activeNavigationSection: string;
    navigationIsOpen: boolean;
}
