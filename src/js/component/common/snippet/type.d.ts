export interface Snippet {
    state: {
        source: string;
        contentIsLoaded: boolean;
        numLines: number;
        awaitLoad: boolean;
        isExpanded: boolean;
    };
    ref: {
        codeEl: HTMLPreElement;
    };
}
