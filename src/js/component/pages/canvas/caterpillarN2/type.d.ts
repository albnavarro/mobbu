export interface CaterpillarN2 {
    state: {
        numItems: number;
        width: number;
        height: number;
        radius: number;
        fill: number;
        opacity: number;
        xAmplitude: number;
        yAmplitude: number;
        duration: number;
        rotationDefault: number;
        friction: number;
        disableOffcanvas: boolean;
        buttons: any;
    };
    ref: {
        wrap: HTMLElement;
        canvas: HTMLCanvasElement;
        rangeValue: HTMLSpanElement;
        rotationButton: HTMLButtonElement;
    };
}
