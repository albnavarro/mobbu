import { componentStoreReturnType } from '../componentStore/type';

export interface componentDataType {
    element: HTMLElement;
    props: object;
    id: string;
    componentName: string;
    instanceName: string;
    key: string;
    dynamicPropsId: string | undefined;
    dynamicPropsIdFromSlot: string | undefined;
    bindEventsId: string | undefined;
    parentId: string | undefined;
    currentRepeatValue: any;
}

export interface getParamsForComponent extends componentStoreReturnType {
    id: string;
    key: string;
    dynamicPropsId: string | undefined;
    dynamicPropsIdFromSlot: string | undefined;
    currentRepeatValue: any;
    bindEventsId: string | undefined;
}
