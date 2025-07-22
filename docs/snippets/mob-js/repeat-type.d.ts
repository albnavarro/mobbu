interface Repeat<T> {
    <K extends keyof ExtractState<T> & string>(arg0: {
        clean?: boolean;
        observe: K;
        key?: string | undefined;
        useSync?: boolean;
        beforeUpdate?(): Promise<void> | void;
        afterUpdate?(): void;
        render: (arg0: {
            sync: () => string;
            initialIndex: number;
            initialValue: ArrayElement<ExtractState<T>[K]>;
            current: PartialCurrent<T, K>;
        }) => string;
    }): string;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(arg0: {
        clean?: boolean;
        observe: () => K;
        key?: string | undefined;
        useSync?: boolean;
        beforeUpdate?(): Promise<void> | void;
        afterUpdate?(): void;
        render: (arg0: {
            sync: () => string;
            initialIndex: number;
            initialValue: ArrayElement<K>;
            current: PartialCurrentProxi<K>;
        }) => string;
    }): string;
}
