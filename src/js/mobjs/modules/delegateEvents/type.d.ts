export interface weakBindEventsData {
    event: string;
    callback: (arg0: Event, arg1: Record<string, any>, arg2: number) => void;
}

export type weakBindEventsDataArray = weakBindEventsData[];

export type delegateEventObject = Record<
    string,
    (arg0: Event, arg1: Record<string, any>, arg2: number) => void
>;
