export interface SearchListItem {
    title: string;
    uri: string;
    section: string;
    count: number;
}

export interface SearchOverlayList {
    state: {
        list: SearchListItem[];
        loading: boolean;
        noResult: boolean;
        updatePrentSearchKey: (value: string) => void;
    };
    methods: {
        update: (data: string) => Promise<void>;
        reset: () => void;
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
