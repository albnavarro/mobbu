export interface ExternalStore {
    counter: number;
    time: number;
    data: { label: string }[];
    isLoading: boolean;
}

export interface BenchMarkExternal {
    state: Readonly<ExternalStore>;
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
