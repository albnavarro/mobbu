export interface HtmlContent {
    props: {
        source: string;
        data: { component: string; props: any; content: string }[];
        awaitLoadSnippet: boolean;
        usePadding?: boolean;
        isSection?: boolean;
    };
}
