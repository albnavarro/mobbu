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
    };
}

export interface NavigationLabel {
    state: {
        label: string;
        sectioName: string;
    };
}

export interface NavigationSubmenu {
    state: {
        callback: () => void;
        headerButton: { label: string; url: string; activeId: number };
        children: any[];
        isOpen: boolean;
    };
}

export interface Navigation {
    state: {
        currentAccordionId: number;
    };
    methods: {
        closeAllAccordion: (arg0: { fireCallback?: boolean }) => void;
    };
}

export interface NavigationContainer {
    methods: {
        scrollTop: () => void;
        refresh: () => void;
    };
}
