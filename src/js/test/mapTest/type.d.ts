export type updateState = <T, K>(arg0: {
    key: T;
    map: Map<T, K>;
    action: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
}) => K | undefined;

export type updateStateByProp = <T, K>(arg0: {
    prop: string;
    value: any;
    map: Map<T, K>;
    action: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
}) => void;

export type myMap = Map<number, { value: string; active: boolean }>;
