export interface WeakBindEventsData {
    event: string;
    callback: (arg0: Event, arg1: Record<string, any>, arg2: number) => void;
}

export type WeakBindEventsDataArray = WeakBindEventsData[];

export type DelegateEventObject<T> = Record<
    string,
    (arg0: T, arg1: Record<string, any>, arg2: number) => void
>;
