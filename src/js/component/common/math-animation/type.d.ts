export interface MathAnimation {
    props: {
        name: string;
        args: any[];
    };
    ref: {
        target: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}
