export interface MathAnimation {
    props: {
        name: string;
        showNavigation: boolean;
        args: any[];
    };
    ref: {
        target: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}
