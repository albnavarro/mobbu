export interface ScrollTo {
    activeLabel: string;
    anchorItemsToBeComputed: {
        element: HTMLElement;
        id: string;
        label: string;
    }[];
    anchorItems: { element: HTMLElement; id: string; label: string }[];
}
