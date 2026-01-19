import { StaggerObject } from 'src/js/mob/mobMotion/animation/utils/stagger/type';

export interface AnimatedPatternN0 {
    props: {
        background: string;
        numberOfRow: number;
        numberOfColumn: number;
        fill: number[];
        stagger: Partial<StaggerObject>;
        reorder: boolean;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
        controlsActive: boolean;
        destroy: () => void;
        currentParamsId: number;
    };
    ref: {
        canvas: HTMLCanvasElement;
    };
}

export type AnimatedPatternN0Animation = (arg0: {
    canvas: HTMLCanvasElement;
    numberOfRow: number;
    numberOfColumn: number;
    fill: number[];
    disableOffcanvas: boolean;
    stagger: Partial<StaggerObject>;
    reorder: boolean;
}) => () => void;
