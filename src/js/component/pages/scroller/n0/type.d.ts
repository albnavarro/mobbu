import { StaggerObject } from 'src/js/mob/mobMotion/animation/utils/stagger/type';

export interface ScrollerN0 {
    props: {
        background: string;
        stagger: StaggerObject;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLElement;
    };
}

export type ScrollerN0Animation = (arg0: {
    canvas: HTMLCanvasElement;
    canvasScroller: HTMLElement;
    stagger: StaggerObject;
    disableOffcanvas: boolean;
}) => () => void;
