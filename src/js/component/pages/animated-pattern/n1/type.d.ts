export interface AnimatedPatternN1 {
    state: {
        isMounted: boolean;
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: number[];
        disableOffcanvas: boolean;
    };
    ref: {
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
