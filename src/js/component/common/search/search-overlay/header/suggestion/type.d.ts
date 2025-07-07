export interface SuggestionItem {
    word: string;
}

export interface SearchOverlaySuggestion {
    state: {
        list: SuggestionItem[];
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
