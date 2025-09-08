export interface LayoutSidebarAnchor {
    props: {
        source: string;
        title: string;
        breadCrumbs: LayoutSidebarAnchorBreadCrumbs[];
        rightSidebar?: {
            label: string;
            url: string;
        }[];
    };
}

export interface LayoutSidebarAnchorBreadCrumbs {
    url: string;
    title: string;
}
