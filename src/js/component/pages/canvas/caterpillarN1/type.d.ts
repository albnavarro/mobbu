export interface CaterpillarN1 {
    state: {
        numItems: number;
        width: number;
        height: number;
        fill: number[];
        opacity: number;
        radius: number;
        rotationEach: number;
        centerEach: number;
        rotationDuration: number;
        disableOffcanvas: boolean;
    };
    ref: {
        wrap: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}

export type CaterpillarN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    numItems: number;
    width: number;
    height: number;
    fill: number[];
    opacity: number;
    radius: number;
    rotationEach: number;
    centerEach: number;
    rotationDuration: number;
    disableOffcanvas: boolean;
}) => () => void;
