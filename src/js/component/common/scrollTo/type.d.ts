export interface ScrollTo {
    activeLabel: string;
    anchorItems: { element: HTMLElement; id: string; label: string }[];
}

export interface AnchorStore {
    items: {
        element: HTMLElement;
        id: string;
        label: string;
    }[];
    computedItems: {
        element: HTMLElement;
        id: string;
        label: string;
    }[];
    activeLabelFromObeserver: string;
}
