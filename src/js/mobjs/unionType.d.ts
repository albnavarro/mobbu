// https://catchts.com/publish-subscribe

type Values<T> = T[keyof T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type BaseType<T> = UnionToIntersection<Values<T>>;

/**
 * Set State
 */
type SetStateRecord<T> = {
    [P in keyof T]: (
        prop: P,
        value: T[P],
        fireCallback?: boolean,
        clone?: boolean
    ) => void;
};

export type SetState<T> = BaseType<SetStateRecord<T>>;

/**
 * WatchSync
 */
type WatchSyncRecord<T> = {
    [P in keyof T]: (prop: P, callback: (arg0: T[P]) => void) => void;
};

export type WatchSync<T> = BaseType<WatchSyncRecord<T>>;
