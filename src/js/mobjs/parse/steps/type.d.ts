import { componentStoreReturnType } from '../../component/type';

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
    componentRepeatId: string | undefined;
    repeatPropBind: string | undefined;
}

export interface getParamsForComponent extends componentStoreReturnType {
    id: string;
    key: string;
    bindEventsId: string | undefined;
}
