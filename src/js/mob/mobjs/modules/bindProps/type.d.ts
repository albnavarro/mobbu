export type BindPropsMap = Map<
    string,
    {
        bind: string[];
        parentId: string | undefined;
        componentId: string;
        propsId: string;
        props: (
            args0: object,
            value: Record<string, any>,
            index: number
        ) => object;
    }
>;

export type SetBindProps = (arg0: {
    bind?: string[];
    parentId: string | undefined;
    props: (
        arg0: object,
        value: Record<string, any>,
        index: number
    ) => Partial<any>;
    forceParent?: boolean;
}) => string | undefined;
