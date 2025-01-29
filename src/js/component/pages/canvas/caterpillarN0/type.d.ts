export interface CaterpillarN0 {
    state: {
        nextRoute: string;
        prevRoute: string;
        amountOfPath: number;
        width: number;
        height: number;
        radius: number;
        fill: number[];
        stroke: string;
        opacity: number;
        spacerY: (arg0: any) => number;
        intialRotation: number;
        perpetualRatio: number;
        mouseMoveRatio: number;
        disableOffcanvas: boolean;
    };
    ref: {
        wrap: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}

export type CaterpillarN0Animation = (arg0: {
    canvas: HTMLCanvasElement;
    amountOfPath: number;
    width: number;
    height: number;
    radius: number;
    fill: number[];
    stroke: string;
    opacity: number;
    spacerY: (arg0: any) => number;
    intialRotation: number;
    perpetualRatio: number;
    mouseMoveRatio: number;
    disableOffcanvas: boolean;
}) => () => void;
