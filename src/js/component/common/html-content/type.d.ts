export interface HtmlContent {
    props: {
        source: string;
        data: { component: string; props: any; content: string }[];
        awaitLoadSnippet: boolean;
        useTriangle?: boolean;
        usePadding?: boolean;
    };
}
