export type updateState = <T, K>(arg0: {
    key: T;
    map: Map<T, K>;
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
}) => K | undefined;

export type updateStateByProp = <T, K>(arg0: {
    prop: string;
    value: any;
    map: Map<T, K>;
    exlcludeKey?: T;
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
}) => void;

export type updateAll = <T, K>(arg0: {
    map: Map<T, K>;
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
}) => void;

export type myMap = Map<number, { value: string; active: boolean }>;
