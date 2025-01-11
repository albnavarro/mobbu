export interface DebugFilterListItem {
    state: {
        id: string;
        tag: string;
        name: string;
    };
    ref: {
        selected: HTMLSpanElement;
    };
}
