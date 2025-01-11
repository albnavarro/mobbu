export interface ScrollerN1 {
    state: {
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
        wrap: HTMLElement;
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLCanvasElement;
    };
}
