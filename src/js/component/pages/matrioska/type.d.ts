export interface Matrioska {
    state: {
        level1: { key: number; value: string }[];
        level2: { key: number; value: string }[];
        level3: { key: number; value: string }[];
        counter: number;
    };
}
