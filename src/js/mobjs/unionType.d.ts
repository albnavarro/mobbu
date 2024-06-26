// https://catchts.com/publish-subscribe
// https://stackoverflow.com/a/50375286

/**
 * Utils:
 * Exclude K value.
 */
type NotValue<T, K> = T extends K ? never : T;
type Values<T> = T[keyof T];

/**
 *
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

export type BaseType<T> = UnionToIntersection<Values<T>>;

/**
 * Set State
 */
export type SetStateRecord<T> = {
    [P in keyof T]: (
        prop: P,
        value: T[P],
        fireCallback?: boolean,
        clone?: boolean
    ) => void;
};

/**
 * WatchSync
 */
export type WatchRecord<T> = {
    [P in keyof T]: (prop: P, callback: (arg0: T[P]) => void) => void;
};

/**
 * @description
 * Computed
 */
export type ComputedRecord<T> = {
    [P in keyof T]: (
        prop: P,
        keys: Array<NotValue<keyof T, P>>,
        callback: (...args: any) => T[P]
    ) => void;
};
