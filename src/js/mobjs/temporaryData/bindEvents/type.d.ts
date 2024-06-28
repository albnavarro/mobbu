export interface bindEventsObject {
    [key: string]: (arg0: Event, arg1: { current: any; index: number }) => void;
}
