export interface HtmlContent {
    source: string;
    data: { component: string; props: any; content: string }[];
    contentIsLoaded: boolean;
    useMinHeight: boolean;
    useMaxWidth: boolean;
}
