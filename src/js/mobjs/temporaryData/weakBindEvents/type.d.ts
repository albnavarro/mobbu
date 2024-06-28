export interface weakBindEventsData {
    event: string;
    callback: (arg0: Event, arg1: { current: object; index: number }) => void;
}

export type weakBindEventsDataArray = weakBindEventsData[];

export interface delegateEventObject {
    [key: string]: (arg0: Event, arg1: { current: any; index: number }) => void;
}
