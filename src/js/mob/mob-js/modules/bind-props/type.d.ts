export type BindPropsMap = Map<
    string,
    {
        observe: string[];
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
    observe?: string[] | (() => any)[];
    parentId: string | undefined;
    props: (
        arg0: object,
        value: Record<string, any>,
        index: number
    ) => Partial<any>;
    forceParent?: boolean;
}) => string | undefined;
