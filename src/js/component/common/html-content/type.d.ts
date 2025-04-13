export interface HtmlContent {
    state: {
        source: string;
        data: { component: string; props: any; content: string }[];
        contentIsLoaded: boolean;
        awaitLoadSnippet: boolean;
        useTriangle?: boolean;
        usePadding?: boolean;
    };
}
