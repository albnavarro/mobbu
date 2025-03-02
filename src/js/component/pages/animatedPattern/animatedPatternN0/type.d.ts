import { StaggerObject } from '../../../../mobMotion/animation/utils/stagger/type';

export interface AnimatedPatternN0 {
    state: {
        isMounted: boolean;
        numberOfRow: number;
        numberOfColumn: number;
        cellWidth: number;
        cellHeight: number;
        gutter: number;
        fill: number[];
        stagger: Partial<StaggerObject>;
        reorder: boolean;
        disableOffcanvas: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
    };
}

export type AnimatedPatternN0Animation = (arg0: {
    canvas: HTMLCanvasElement;
    numberOfRow: number;
    numberOfColumn: number;
    cellWidth: number;
    cellHeight: number;
    gutter: number;
    fill: number[];
    disableOffcanvas: boolean;
    stagger: Partial<StaggerObject>;
    reorder: boolean;
}) => () => void;
