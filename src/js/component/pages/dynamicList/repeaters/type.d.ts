export interface DynamicListRepeater {
    state: {
        data: { key: string; label: string }[];
        key: string;
        clean: boolean;
        listId: number;
        counter: number;
        label: string;
    };
}
