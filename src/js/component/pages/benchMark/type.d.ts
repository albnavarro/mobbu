export interface BenchMark {
    state: {
        counter: number;
        time: number;
        data: { label: string }[];
        isLoading: boolean;
    };
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
