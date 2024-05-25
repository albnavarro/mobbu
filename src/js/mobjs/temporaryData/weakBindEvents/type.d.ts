export interface weakBindEventsData {
    event: string;
    callback: (arg0: Event, arg1: { current: object; index: number }) => void;
}

export type weakBindEventsDataArray = weakBindEventsData[];
