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
        shouldCloseSuggestion: (element: HTMLElement) => void;
        closeSuggestion: () => void;
        setInputFocus: () => void;
    };
}
