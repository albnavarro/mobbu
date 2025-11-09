export interface ScrollToItemsToAdd {
    id: string;
    label: string;
    element: HTMLElement;
    isSection?: boolean;
    isNote?: boolean;
}

export interface ScrollTo {
    state: {
        activeLabel: string;
        updateAnchorOnWheel: boolean;
        anchorItemsToBeComputed: {
            element: HTMLElement;
            id: string;
            label: string;
            isSection?: boolean;
            isNote?: boolean;
        }[];
        anchorItems: {
            element: HTMLElement;
            id: string;
            label: string;
            isSection?: boolean;
            isNote?: boolean;
            top: number;
        }[];
    };
    methods: {
        addItem: (arg0: ScrollToItemsToAdd) => void;
        setActiveLabel: (arg0: string) => void;
    };
}
