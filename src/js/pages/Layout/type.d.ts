export interface LayoutSidebarAnchor {
    props: {
        source: string;
        title: string;
        breadCrumbs: LayoutSidebarAnchorBreadCrumbs[];
    };
}

export interface LayoutSidebarAnchorBreadCrumbs {
    url: string;
    title: string;
}
