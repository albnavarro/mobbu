// https://catchts.com/publish-subscribe
// https://stackoverflow.com/a/50375286

export type OnlyStringKey<T> = Extract<keyof T, string>;

/**
 * Utils:
 * Exclude K value.
 */
export type NotValue<T, K> = T extends K ? never : T;
