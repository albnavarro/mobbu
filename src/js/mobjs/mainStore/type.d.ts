export type componentFunctionType = (
    arg0: import('../type').componentPropsType
) => Promise<string> | string;

export interface componentListMapType {
    componentFunction: componentFunctionType;
    componentParams: import('../type').ComponentParsed;
}

export interface MainStore {
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

export type MainStoreWatch = (
    callback: (arg0: { route: string; templateName: string }) => void
) => () => void;

export type MainStoreLoading = (
    callback: (state: boolean) => void
) => () => void;

export type MainStoreActiveRoute = () => {
    route: string;
    templateName: string;
};

export type MainStoreActiveParams = () => Record<string, any>;
