interface Invalidate<T> {
    (arg0: {
        observe?:
            | OnlyStringKey<ExtractState<T>>[]
            | OnlyStringKey<ExtractState<T>>;
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
    (arg0: {
        observe?:
            | (() => ExtractState<T>[keyof ExtractState<T>])[]
            | (() => ExtractState<T>[keyof ExtractState<T>]);
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
}
