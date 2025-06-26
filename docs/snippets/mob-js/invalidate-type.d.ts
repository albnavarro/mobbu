interface Invalidate<T> {
    (arg0: {
        bind?:
            | OnlyStringKey<ExtractState<T>>[]
            | OnlyStringKey<ExtractState<T>>;
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
    (arg0: {
        bind?:
            | (() => ExtractState<T>[keyof ExtractState<T>])[]
            | (() => ExtractState<T>[keyof ExtractState<T>]);
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
}
