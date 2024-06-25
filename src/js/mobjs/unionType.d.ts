type Values<T> = T[keyof T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

/**
 * Set State
 */
type setStateRecord<T> = {
    [P in keyof T]: (
        prop: P,
        value: T[P],
        fireCallback?: boolean,
        clone?: boolean
    ) => void;
};

export type setState<T> = UnionToIntersection<Values<setStateRecord<T>>>;

/**
 * Set State
 */
