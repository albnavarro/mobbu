export interface ScrollTo {
    state: {
        activeLabel: string;
        anchorItemsToBeComputed: {
            element: HTMLElement;
            id: string;
            label: string;
        }[];
        anchorItems: { element: HTMLElement; id: string; label: string }[];
    };
    methods: {
        addItem: (arg0: {
            id: string;
            label: string;
            element: HTMLElement;
        }) => void;
        setActiveLabel: (arg0: string) => void;
    };
}
