export type componentFunctionType = (
    arg0: import('../type').componentPropsType
) => Promise<string> | string;

export interface componentListMapType {
    componentFunction: componentFunctionType;
    componentParams: import('../type').componentParsedType;
}

export interface MainStore {
    activeRoute: string;
    activeParams: {
        [key: string]: any;
    };
    beforeRouteLeave: string;
    beforeRouteChange: string;
    afterRouteChange: string;
    routeIsLoading: boolean;
    repeaterParserRoot: {
        element: HTMLElement;
        parentId: string;
    };
    pippo: number;
}
