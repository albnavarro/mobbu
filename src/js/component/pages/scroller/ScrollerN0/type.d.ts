import { StaggerObject } from '../../../../mobMotion/animation/utils/stagger/type';

export interface ScrollerN0 {
    state: {
        title: string;
        nextRoute: string;
        prevRoute: string;
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
        wrap: HTMLElement;
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
