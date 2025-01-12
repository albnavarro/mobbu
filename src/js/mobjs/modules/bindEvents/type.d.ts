export type bindEventsObject<T> = Record<
    string,
    (arg0: T, value: Rcord<string, any>, index: number) => void
>;
