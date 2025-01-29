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

export type AnimatedPatternN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    numberOfRow: number;
    numberOfColumn: number;
    cellWidth: number;
    cellHeight: number;
    gutter: number;
    fill: number[];
    disableOffcanvas: boolean;
}) => () => void;
