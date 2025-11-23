export interface BenchMark {
    state: {
        counter: number;
        time: number;
        data: { label: string }[];
        isLoading: boolean;
        currentIndex: number;
        plutone: {
            prop: number;
            prop2: number;
        };
    };
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
