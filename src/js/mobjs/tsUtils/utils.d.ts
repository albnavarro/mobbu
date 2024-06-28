// https://catchts.com/publish-subscribe
// https://stackoverflow.com/a/50375286

export type OnlyStringKey<T> = Extract<keyof T, string>;

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
 *
 */
type TemplateRecord<T> = Record<keyof T, T>;

/**
 * For each values of object
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

export type BaseType<T> = UnionToIntersection<Values<T>>;
