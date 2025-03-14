export interface NavigationButton {
    state: {
        label: string;
        url: string;
        activeId: number;
        scrollToSection: string;
        arrowClass: string;
        subMenuClass: string;
        fireRoute: boolean;
        callback: () => void;
        isOpen: boolean;
        isCurrent: boolean;
    };
}

export interface NavigationLabel {
    state: {
        label: string;
        sectioName: string;
        activeNavigationSection: string;
    };
}

export interface NavigationSubmenu {
    state: {
        callback: () => void;
        headerButton: Partial<{ label: string; url: string; activeId: number }>;
        children: any[];
        isOpen: boolean;
    };
    ref: {
        content: HTMLElement;
    };
}

export interface Navigation {
    state: {
        currentAccordionId: number;
    };
    methods: {
        closeAllAccordion: (arg0?: { fireCallback?: boolean }) => void;
    };
}

export interface NavigationContainer {
    state: {
        isOpen: boolean;
    };
    methods: {
        scrollTop: () => void;
        refresh: () => void;
    };
}
