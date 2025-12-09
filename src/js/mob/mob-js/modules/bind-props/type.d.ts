export interface BindPropsMap {
    observe: string[];
    parentId: string | undefined;
    componentId: string;
    propsId: string;
    props: (args0: object, value: Record<string, any>, index: number) => object;
}

export interface BindPropsMapWrapper {
    get: (key: string) => BindPropsMap | undefined;
    set: (key: string, value: BindPropsMap) => BindPropsMapWrapper;
    delete: (key: string) => boolean;
    has: (key: string) => boolean;
    clear: () => void;
    size: number;
    entries: () => IterableIterator<[string, BindPropsMap]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<BindPropsMap>;
    forEach: (callback: (value: BindPropsMap, key: string) => void) => void;
    compact: () => void;
}

export type SetBindProps = (arg0: {
    observe?: string[] | (() => any)[];
    parentId: string | undefined;
    props: (
        arg0: object,
        value: Record<string, any>,
        index: number
    ) => Partial<any>;
}) => string | undefined;

export interface BindComponentTobindIdWrapper {
    get: (key: string) => string | undefined;
    set: (key: string, value: string) => BindComponentTobindIdWrapper;
    delete: (key: string) => boolean;
    has: (key: string) => boolean;
    clear: () => void;
    size: number;
    entries: () => IterableIterator<[string, string]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<string>;
    forEach: (callback: (value: string, key: string) => void) => void;
    compact: () => void;
}
