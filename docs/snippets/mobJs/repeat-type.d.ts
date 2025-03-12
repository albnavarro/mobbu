export type PartialRepeat<T> = <K extends keyof T>(arg0: {
    clean?: boolean;
    persistent: boolean;
    bind: OnlyStringKey<T>;
    key?: string | undefined;
    useSync?: boolean;
    beforeUpdate?(): Promise<void> | void;
    afterUpdate?: () => void;
    render: (arg0: {
        sync: () => string;
        initialIndex: number;
        initialValue: Record<string, any>;
        current: {
            index: number;
            value: Record<string, any>;
        };
    }) => string;
}) => string;
