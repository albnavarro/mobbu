export interface DynamicListCard {
    parentListId: number;
    isFull: boolean;
    label: string;
    index: number;
    counter: number;
    innerData: { key: number }[];
    innerData2: { key: number }[];
    isSelected: boolean;
}
