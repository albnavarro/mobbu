export interface CodeOverlayButton {
    state: {
        key: string;
        selected: boolean;
        disable: boolean;
    };
}

export interface CodeOverlay {
    state: {
        urls: { label: string; source: string }[];
        activeContent: string;
        rawContent: string;
    };
    ref: {
        screenEl: HTMLElement;
        scrollerEl: HTMLElement;
        codeEl: HTMLElement;
        scrollbar: HTMLInputElement;
    };
}
