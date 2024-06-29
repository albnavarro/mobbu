export interface NavigationButton {
    label: string;
    url: string;
    activeId: number;
    scrollToSection: string;
    arrowClass: string;
    subMenuClass: string;
    fireRoute: boolean;
    callback: () => void;
    isOpen: boolean;
}

export interface NavigationLabel {
    label: string;
    sectioName: string;
}

export interface NavigationSubmenu {
    callback: () => void;
    headerButton: { label: string; url: string; activeId: number };
    children: any[];
    isOpen: boolean;
}

export interface Navigation {
    currentAccordionId: number;
}
