export interface About {
    state: {
        title: string;
        block_1: string;
        block_2: string;
        block_3: string;
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
