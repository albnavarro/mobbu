import { NavigationStore } from '@stores/navigation/type';

export interface NavigationButton {
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
    };
    state: {
        isCurrent: boolean;
    };
}

export interface NavigationLabel {
    props: {
        label: string;
        sectioName: string;
        hide?: boolean;
    };
    state: Readonly<NavigationStore>;
}

export interface NavigationSubmenu {
    props: {
        callback: (arg0: { forceClose: boolean }) => void;
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
        isMounted: boolean;
    };
    methods: {
        scrollTop: () => void;
        refresh: () => void;
    };
}
