export interface About {
    state: {
        title: string;
    };
    ref: {
        screen: HTMLElement;
        scroller: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screen: HTMLElement;
    scroller: HTMLElement;
}) => {
    destroy: () => void;
};
