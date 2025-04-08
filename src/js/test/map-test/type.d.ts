export type updateState = <K, O>(arg0: {
    key: K;
    map: Map<K, O>;
    update: (arg0: { key: K; map: Map<K, O>; state: O }) => O;
    set: (arg0: { key: K; state: O }) => void;
}) => O | undefined;

export type updateStateByProp = <K, O, P extends keyof O>(arg0: {
    prop: P;
    value: O[P];
    map: Map<K, O>;
    exclude?: K[];
    update: (arg0: { key: K; map: Map<K, O>; state: O }) => O;
    set: (arg0: { key: K; state: O }) => void;
}) => void;

export type updateAll = <K, O>(arg0: {
    map: Map<K, O>;
    update: (arg0: { key: K; map: Map<K, O>; state: O }) => O;
    set: (arg0: { key: K; state: O }) => void;
}) => void;

export type myMap = Map<number, { value: string; active: boolean }>;
