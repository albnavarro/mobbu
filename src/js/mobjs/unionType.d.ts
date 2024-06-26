// https://catchts.com/publish-subscribe
// https://stackoverflow.com/a/50375286

/**
 * Utils:
 * Exclude K value.
 */
type NotValue<T, K> = T extends K ? never : T;

/**
 * Get object values.
 */
type Values<T> = T[keyof T];

/**
 * For each values of object
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

export type BaseType<T> = UnionToIntersection<Values<T>>;

/**
 * @description
 * GetState
 */
export type GetStateRecord<T> = {
    [P in keyof T]: T[P];
};

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
 * TODO: arg: any, se viene buttato fuori come oggetto,
 * Posso usare la tecnica di BInd props con un Union... innestato.
 */
export type ComputedRecord<T> = {
    [P in keyof T]: (
        prop: P,
        keys: Array<NotValue<keyof T, P>>,
        callback: (...args: any) => T[P]
    ) => void;
};

/**
 * @description
 * BindProps
 */
type BindPropsParamsRecord<T> = Record<keyof T, T>;

export type BindPropsRecord<T> = {
    [P in keyof T]: (arg0: {
        bind: Array<keyof T>;
        forceParent?: boolean;
        props: (arg0: BaseType<BindPropsParamsRecord<T>>) => {
            [key: string]: any;
        };
    }) => string;
};
