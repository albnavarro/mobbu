export interface Snippet {
    props: {
        source: string;
        numLines: number;
        awaitLoad: boolean;
    };
    state: {
        isExpanded: boolean;
        contentIsLoaded: boolean;
    };
    ref: {
        codeEl: HTMLPreElement;
    };
}
