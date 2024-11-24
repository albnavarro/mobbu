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
}
