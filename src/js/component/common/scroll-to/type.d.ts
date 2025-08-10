export interface ScrollTo {
    state: {
        activeLabel: string;
        anchorItemsToBeComputed: {
            element: HTMLElement;
            id: string;
            label: string;
            isSection?: boolean;
        }[];
        anchorItems: {
            element: HTMLElement;
            id: string;
            label: string;
            isSection?: boolean;
        }[];
    };
    methods: {
        addItem: (arg0: {
            id: string;
            label: string;
            element: HTMLElement;
            isSection?: boolean;
        }) => void;
        setActiveLabel: (arg0: string) => void;
    };
}
