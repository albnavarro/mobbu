export interface weakBindEventsData {
    event: string;
    callback: (arg0: Event, index: number) => void;
}

export type weakBindEventsDataArray = weakBindEventsData[];

export type delegateEventObject = Record<
    string,
    (arg0: Event, index: number) => void
>;
