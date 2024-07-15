export interface DynamicListCard {
    parentListId: number;
    isFull: boolean;
    label: string;
    index: number;
    counter: number;
    innerData: { key: number }[];
    isSelected: boolean;
}
