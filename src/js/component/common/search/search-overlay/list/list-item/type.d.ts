export interface SearchOverlayListItemType {
    props: {
        uri: string;
        breadCrumbs: { hash: string; name: string }[];
        title: string;
        count: number;
        active: boolean;
    };
}
