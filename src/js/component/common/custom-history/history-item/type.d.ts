export interface HistoryItem {
    props: {
        id: string;
        url: string;
        active: boolean;
        forceSelect: boolean;
    };
    state: {
        checked: boolean;
    };
}
