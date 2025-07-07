export interface SearchListItem {
    section: string;
    title: string;
    uri: string;
}

export interface SearchOverlayList {
    state: {
        list: SearchListItem[];
    };
    methods: {
        update: (data: SearchListItem[]) => void;
        reset: () => void;
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
