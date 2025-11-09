import { RightSideBarList } from '@commonComponent/right-sidebar/type';

export interface LayoutSidebarAnchor {
    props: {
        source: string;
        title: string;
        breadCrumbs: LayoutSidebarAnchorBreadCrumbs[];
        rightSidebar?: RightSideBarList[];
    };
}

export interface LayoutSidebarAnchorBreadCrumbs {
    url: string;
    title: string;
}
