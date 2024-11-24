export interface DynamicList {
    state: {
        counter: number;
        data: { key: string; label: string }[];
        activeSample: number;
    };
}
