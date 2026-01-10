export interface MathAnimation {
    props: {
        name: string;
        showNavigation: boolean;
        numberOfStaggers: number;
        args: any[];
    };
    ref: {
        target: HTMLElement;
        canvas: HTMLCanvasElement;
    };
}
