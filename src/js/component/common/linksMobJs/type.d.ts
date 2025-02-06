export interface LinksMobJsButton {
    state: {
        label: string;
        url: string;
        active: boolean;
    };
}

export interface LinksMobJs {
    state: {
        data: { label: string; url: string; isLabel: boolean }[];
        activeSection: string;
        hideScrollbar: boolean;
    };
    ref: {
        screenEl: HTMLElement;
        scrollerEl: HTMLElement;
        scrollbar: HTMLInputElement;
    };
}
