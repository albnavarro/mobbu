export interface CodeOverlayButton {
    key: string;
    selected: boolean;
    disable: boolean;
}

export interface CodeOverlay {
    urls: string[];
    activeContent: string;
    rawContent: string;
}
