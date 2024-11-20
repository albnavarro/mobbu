export type BindPropsMap = Map<
    string,
    {
        bind: string[];
        parentId: string | undefined;
        componentId: string;
        propsId: string;
        props: (args0: object, index: number) => object;
    }
>;
