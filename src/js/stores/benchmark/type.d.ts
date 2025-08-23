export interface ExternalStore {
    counter: number;
    time: number;
    data: { label: string }[];
    isLoading: boolean;
}
