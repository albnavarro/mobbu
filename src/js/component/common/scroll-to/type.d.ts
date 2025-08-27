export interface ScrollTo {
    state: {
        activeLabel: string;
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
        addItem: (arg0: {
            id: string;
            label: string;
            element: HTMLElement;
            isSection?: boolean;
            isNote?: boolean;
        }) => void;
        setActiveLabel: (arg0: string) => void;
    };
}
