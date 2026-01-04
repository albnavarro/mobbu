export interface MathAnimation {
    props: {
        name: string;
    };
    ref: {
        target: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}
