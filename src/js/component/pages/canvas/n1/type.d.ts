export interface CaterpillarN1 {
    state: {
        isMounted: boolean;
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
