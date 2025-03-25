export type PartialInvalidateComponent<T> = (arg0: {
    bind?: OnlyStringKey<GetState<T>>[] | OnlyStringKey<GetState<T>>;
    beforeUpdate?(): Promise<void>;
    afterUpdate?(): void;
    render: (arg0: {
        html: (
            template: { raw: readonly string[] | ArrayLike<string> },
            ...substitutions: any[]
        ) => string;
    }) => string;
}) => string;
