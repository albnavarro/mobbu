export type BindEventsObject<T> = Record<
    string,
    (arg0: T, value: Record<string, any>, index: number) => void
>;
