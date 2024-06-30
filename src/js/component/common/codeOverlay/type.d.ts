export interface CodeOverlayButton {
    key: string;
    selected: boolean;
    disable: boolean;
}

export interface CodeOverlay {
    urls: { label: string; source: string }[];
    activeContent: string;
    rawContent: string;
}
