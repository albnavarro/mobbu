export interface NavigationStore {
    openNavigation: () => void;
    closeNavigation: () => void;
    activeNavigationSection: string;
    navigationIsOpen: boolean;
}
