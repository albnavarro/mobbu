export interface DynamicListCard {
    props: {
        parentListId: number;
        isFull: boolean;
        label: string;
        index: number;
        counter: number;
    };
    state: {
        innerData: { key: number }[];
        innerDataUnivoque: { key: number }[];
        isSelected: boolean;
        isMounted: boolean;
    };
}
