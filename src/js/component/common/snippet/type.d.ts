export interface Snippet {
    state: {
        source: string;
        contentIsLoaded: boolean;
        isFull: boolean;
        hasOverflow: boolean;
        hasBorder: boolean;
        numLines: number;
        awaitLoad: boolean;
    };
    ref: {
        codeEl: HTMLPreElement;
    };
}
