import { NavigationStore } from '@stores/navigation/type';

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
        forceChildren: string[];
    };
}

interface NavigationLabelState extends Readonly<NavigationStore> {
    label: string;
    sectioName: string;
}

export interface NavigationLabel {
    state: NavigationLabelState;
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
        isMounted: boolean;
    };
    methods: {
        scrollTop: () => void;
        refresh: () => void;
    };
}
