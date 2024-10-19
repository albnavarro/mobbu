export type bindEventsObject = Record<
    string,
    (arg0: Event, arg1: { current: any; index: number }) => void
>;
