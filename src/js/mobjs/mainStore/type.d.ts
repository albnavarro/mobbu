import { ComponentParsed, ComponentPropsType } from '../type';

export type ComponentFunction = (
    arg0: ComponentPropsType
) => Promise<string> | string;

export interface ComponentListMap {
    componentFunction: ComponentFunction;
    componentParams: ComponentParsed;
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
