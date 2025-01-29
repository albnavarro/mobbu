export interface CommonData {
    header: {
        links: {
            svg: string;
            url: string;
            internal: boolean;
        }[];
    };
    footer: {
        nav: {
            label: string;
            url: string;
            section: string;
        }[];
    };
    sideBarLinks: {
        mobJsComponentParams: {
            label: string;
            url: string;
            isLabel: boolean;
        }[];
        mobJsTraversal: {
            label: string;
            url: string;
            isLabel: boolean;
        }[];
    };
    navigation: {
        label: string;
        url: string;
        section?: string;
        activeId: number;
        sectioName?: string;
        scrollToSection?: string;
        children: NavigationChildren[];
    }[];
}

export interface NavigationChildren {
    label: string;
    url: string;
    scrollToSection: string;
    activeId: number;
}
