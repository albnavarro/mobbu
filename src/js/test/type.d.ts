export interface StoreTest {
    prop: number;
    myComputed: number;
    myComputed2: number;
    myComputed3: number;
    proxiProp: number;
    activeRoute: { route: string; templateName: string };
    activeParams: Record<string, any>;
    beforeRouteLeave: { route: string; templateName: string };
    beforeRouteChange: { route: string; templateName: string };
    afterRouteChange: { route: string; templateName: string };
    routeIsLoading: boolean;
    repeaterParserAsync: {
        element: HTMLElement;
        parentId: string;
        persistent: boolean;
    };
}

export interface proxiStore {
    proxiProp: number;
}
