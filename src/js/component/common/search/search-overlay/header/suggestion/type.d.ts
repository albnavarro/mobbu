export interface SuggestionItem {
    word: string;
    wordHiglight: string;
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
