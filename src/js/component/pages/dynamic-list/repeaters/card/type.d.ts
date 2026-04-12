export interface DynamicListCardType {
    props: {
        parentListId: number;
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
