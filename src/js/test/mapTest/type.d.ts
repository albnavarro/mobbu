export type updateState = <T, K>(arg0: {
    key: T;
    map: Map<T, K>;
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
    set: (arg0: { key: T; state: K }) => void;
}) => K | undefined;

export type updateStateByProp = <T, K>(arg0: {
    prop: string;
    value: any;
    map: Map<T, K>;
    exclude?: T[];
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
    set: (arg0: { key: T; state: K }) => void;
}) => void;

export type updateAll = <T, K>(arg0: {
    map: Map<T, K>;
    update: (arg0: { key: T; map: Map<T, K>; state: K }) => K;
    set: (arg0: { key: T; state: K }) => void;
}) => void;

export type myMap = Map<number, { value: string; active: boolean }>;
