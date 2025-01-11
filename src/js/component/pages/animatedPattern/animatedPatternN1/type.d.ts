export interface AnimatedPatternN1 {
    state: {
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: number[];
        disableOffcanvas: boolean;
    };
    ref: {
        wrap: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}
