export interface animationTitle {
    title: number;
    align: boolean;
}

export interface DumpRecord {
    arr: boolean[];
    num: number;
    str: string;
}

type RowType = Record<string, any>;
interface Row<T = RowType, K extends keyof T = keyof T> {
    key: K;
    render: (value: T[K], row: T) => any;
}
type Values<T> = T[keyof T];
type Union<T> = Values<{
    [Prop in keyof T]: Row<T, Prop>;
}>;
