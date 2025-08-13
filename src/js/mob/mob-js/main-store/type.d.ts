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
    beforeRouteChange: {
        currentRoute: string;
        currentTemplate: string;
        nextRoute: string;
        nextTemplate: string;
    };
    afterRouteChange: {
        previousRoute: string;
        previousTemplate: string;
        currentRoute: string;
        currentTemplate: string;
    };
    routeIsLoading: boolean;
    repeaterParserAsync: {
        element: HTMLElement;
        parentId: string;
        persistent: boolean | undefined;
    };
}

export type MainStoreWatchBefore = (
    callback: (arg0: {
        currentRoute: string;
        currentTemplate: string;
        nextRoute: string;
        nextTemplate: string;
    }) => void
) => () => void;

export type MainStoreWatchAfter = (
    callback: (arg0: {
        previousRoute: string;
        previousTemplate: string;
        currentRoute: string;
        currentTemplate: string;
    }) => void
) => () => void;

export type MainStoreLoading = (
    callback: (state: boolean) => void
) => () => void;

export type MainStoreActiveRoute = () => {
    route: string;
    templateName: string;
};

export type MainStoreActiveParams = () => Record<string, any>;
