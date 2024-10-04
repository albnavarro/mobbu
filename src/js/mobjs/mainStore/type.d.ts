export type componentFunctionType = (
    arg0: import('../type').componentPropsType
) => Promise<string> | string;

export interface componentListMapType {
    componentFunction: componentFunctionType;
    componentParams: import('../type').ComponentParsed;
}

export interface MainStore {
    activeRoute: { route: string; templateName: string };
    activeParams: {
        [key: string]: any;
    };
    beforeRouteLeave: { route: string; templateName: string };
    beforeRouteChange: { route: string; templateName: string };
    afterRouteChange: { route: string; templateName: string };
    routeIsLoading: boolean;
    repeaterParserAsync: {
        element: HTMLElement;
        parentId: string;
        isCancellable: boolean;
    };
}
