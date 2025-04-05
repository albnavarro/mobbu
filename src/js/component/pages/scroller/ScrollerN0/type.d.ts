import { StaggerObject } from '../../../../mob/mobMotion/animation/utils/stagger/type';

export interface ScrollerN0 {
    state: {
        isMounted: boolean;
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: number[];
        stagger: StaggerObject;
        reorder: boolean;
        disableOffcanvas: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        canvasScroller: HTMLElement;
    };
}

export type ScrollerN0Animation = (arg0: {
    canvas: HTMLCanvasElement;
    canvasScroller: HTMLElement;
    numberOfRow: number;
    numberOfColumn: number;
    cellWidth: number;
    cellHeight: number;
    gutter: number;
    fill: number[];
    stagger: StaggerObject;
    reorder: boolean;
    disableOffcanvas: boolean;
}) => () => void;
