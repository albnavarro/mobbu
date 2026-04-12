export interface SuggestionItem {
    word: string;
    wordHiglight: string;
}

export interface SearchOverlaySuggestionType {
    props: {
        list: SuggestionItem[];
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
