export interface CaterpillarN1 {
    props: {
        background: string;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
    };
}

export type CaterpillarN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    disableOffcanvas: boolean;
}) => () => void;
