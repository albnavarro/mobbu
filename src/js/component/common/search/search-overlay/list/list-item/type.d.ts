export interface SearchOverlayListItem {
    props: {
        uri: string;
        breadCrumbs: string;
        title: string;
        count: number;
        active: boolean;
    };
}
