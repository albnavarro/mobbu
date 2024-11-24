export interface BenchMark {
    state: {
        counter: number;
        time: number;
        data: { label: string }[];
        isLoading: boolean;
    };
}
