export interface ScrollerN1 {
    props: {
        background: string;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLCanvasElement;
    };
}

export type ScrollerN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    canvasScroller: HTMLElement;
    disableOffcanvas: boolean;
}) => () => void;
