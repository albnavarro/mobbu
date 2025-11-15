export interface BenchMark {
    state: {
        counter: number;
        time: number;
        data: { label: string }[];
        isLoading: boolean;
        currentIndex: number;
    };
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
