export type bindEventsObject = Record<
    string,
    (arg0: Event, value: Rcord<string, any>, index: number) => void
>;
