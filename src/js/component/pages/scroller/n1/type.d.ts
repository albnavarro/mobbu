import { ProxiState } from '@mobJsType';

export interface ScrollerN1 {
    props: {
        background: string;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
        controlsActive: boolean;
        rotation: number;
        rotationlabel: number;
    };
    ref: {
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLCanvasElement;
        inputRange: HTMLInputElement;
    };
}

export type ScrollerN1Animation = (arg0: {
    canvas: HTMLCanvasElement;
    canvasScroller: HTMLElement;
    disableOffcanvas: boolean;
    proxi: ProxiState<ScrollerN1>;
}) => () => void;
