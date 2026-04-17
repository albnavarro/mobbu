import { CreateComponentReturnType } from '@mobJsType';
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
        sync: () => Record<string, string>;
        initialIndex: number;
        initialValue: any;
        current: {
            index: number;
            value: any;
        };
    }) => HTMLElement;
    useSync?: boolean;
}

export interface NodeOrText {
    item: ChildNode | string | NodeOrTextMix | undefined;
    type: string;
}

export type NodeOrTextMix = (
    | { node: string; type: string }
    | { node: ChildNode; type: string }
    | { node: undefined; type: string }
)[];

/**
 * Tipo ricorsivo per il contenuto.
 */
export type FromObjectNodeContentItem =
    | string
    | HTMLElement
    | FromObjectNodeDescriptor;

/**
 * Tipo ricorsivo per il contenuto. Supporta singoli valori, array misti e array annidati.
 */
export type FromObjectNodeContent =
    | FromObjectNodeContentItem
    | (FromObjectNodeContentItem | FromObjectNodeContentItem[])[];

/**
 * Tipo per il nodo del DOM.
 */
export interface FromObjectNodeDescriptor {
    component?: CreateComponentReturnType;
    tag?: keyof HTMLElementTagNameMap | (string & {});
    className?: string | string[];
    style?: Record<string, string>;
    dataAttributes?: Record<
        string,
        string | number | boolean | null | undefined
    >;

    /**
     * Attributi HTML standard. Exclude 'class' e 'style'.
     */
    attributes?: Omit<
        Record<string, string | number | boolean | null | undefined>,
        'class' | 'style'
    >;
    modules?: Record<string, string> | Record<string, string>[];
    content?: FromObjectNodeContent;
}

export type FromObjectType = (data: FromObjectNodeDescriptor) => HTMLElement;
