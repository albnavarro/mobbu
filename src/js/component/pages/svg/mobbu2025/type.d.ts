export interface Mobbu2025 {
    state: {
        layer01: string;
        layer02: string;
        layer03: string;
        layer04: string;
    };
    ref: {
        screen: HTMLDivElement;
        scroller: HTMLDivElement;
        layer04: HTMLDivElement;
        layer02: HTMLDivElement;
        layer01: HTMLDivElement;
    };
}

export type Mobbu2025Scroller = ({
    screenElement: HTMLDivElement,
    scrollerElement: HTMLDivElement,
    layer04: HTMLDivElement,
    layer02: HTMLDivElement,
    layer01: HTMLDivElement,
}) => {
    destroy: () => void;
};
