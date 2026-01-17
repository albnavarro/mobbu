export interface Mobbu2025 {
    props: {
        layer02: string;
        layer03: string;
    };
    ref: {
        screen: HTMLDivElement;
        scroller: HTMLDivElement;
        layer02: HTMLDivElement;
    };
}

export type Mobbu2025Scroller = (arg0: {
    screenElement: HTMLDivElement;
    scrollerElement: HTMLDivElement;
    layer02: HTMLDivElement;
}) => {
    destroy: () => void;
};
