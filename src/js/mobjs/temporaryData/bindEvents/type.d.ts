export interface bindEventsObject {
    [key: string]: (
        arg0: Event,
        arg1: { _current: any; _index: number }
    ) => void;
}
