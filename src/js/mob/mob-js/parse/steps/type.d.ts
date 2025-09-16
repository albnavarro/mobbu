import { ComponentStoreReturn } from '../../component/type';

export interface ComponentData {
    element: HTMLElement;
    props: object;
    id: string;
    componentName: string;
    instanceName: string;
    key: string;
    dynamicPropsId: string | undefined;
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

interface RepeatInternal {
    /**
     * Observed state.
     */
    observe: string | (() => any);

    /**
     * If true remove previous item.
     */
    clean?: boolean;
    beforeUpdate?: () => Promise<void> | void;
    afterUpdate?: () => void;

    /**
     * Define id repeater use a key
     */
    key?: string;
    render: (arg0: {
        sync: () => string;
        initialIndex: number;
        initialValue: astring;
        current: {
            index: number;
            value: any;
        };
    }) => string;
    useSync?: boolean;
}
