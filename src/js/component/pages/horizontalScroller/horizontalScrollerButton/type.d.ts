export interface HorizontalScrollerButton {
    state: {
        id: number;
        active: boolean;
    };
    ref: {
        button: HTMLButtonElement;
    };
}
