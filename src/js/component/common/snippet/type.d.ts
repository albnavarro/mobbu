export interface Snippet {
    props: {
        contentIsLoaded: boolean;
        isExpanded: boolean;
    };
    state: {
        source: string;
        numLines: number;
        awaitLoad: boolean;
    };
    ref: {
        codeEl: HTMLPreElement;
    };
}
