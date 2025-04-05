import { ComponentStoreReturn } from '../../component/type';

export interface ComponentData {
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

export interface GetParamsForComponent extends ComponentStoreReturn {
    id: string;
    key: string;
    bindEventsId: string | undefined;
}
