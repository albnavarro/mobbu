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
        update: (data: string) => void;
        reset: () => void;
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
