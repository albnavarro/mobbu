export interface ScrollerN1 {
    state: {
        isMounted: boolean;
        amountOfPath: number;
        width: number;
        height: number;
        radius: number;
        opacity: number;
        intialRotation: number;
        endRotation: number;
        disableOffcanvas: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLCanvasElement;
    };
}

export type ScrollerN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    canvasScroller: HTMLElement;
    amountOfPath: number;
    width: number;
    height: number;
    radius: number;
    opacity: number;
    intialRotation: number;
    endRotation: number;
    disableOffcanvas: boolean;
}) => () => void;
