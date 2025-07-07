import { SuggestionItem } from './suggestion/type';

export interface SearchOverlayHeader {
    state: {
        suggestionListActive: boolean;
        suggestionListData: SuggestionItem[];
    };
    ref: {
        search_input: HTMLInputElement;
        suggestionElement: HTMLDivElement;
    };
    methods: {
        forceInputValue: (value: string) => void;
        closeSuggestion: (element: HTMLElement) => void;
        setInputFocus: () => void;
    };
}
