export interface SuggestionItem {
    word: string;
    wordHiglight: string;
}

export interface SearchOverlaySuggestion {
    props: {
        list: SuggestionItem[];
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
