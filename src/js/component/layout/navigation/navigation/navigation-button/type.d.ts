export interface NavigationButtonType {
    props: {
        label: string;
        url: string;
        activeId: number;
        scrollToSection: string;
        arrowClass: string;
        subMenuClass: string;
        fireRoute: boolean;
        callback: () => void;
        isOpen: boolean;
        forceChildren: string[];
        ariaLabel: string;
        ariaId: string;
    };
    state: {
        isCurrent: boolean;
    };
}
