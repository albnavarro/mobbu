export interface ScrollToButton {
    state: {
        label: string;
        active: boolean;
    };
    ref: {
        labelRef: HTMLSpanElement;
    };
}
