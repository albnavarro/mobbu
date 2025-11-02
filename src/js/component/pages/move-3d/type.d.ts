import { Move3DChildren } from '../type';

export interface Move3DPage {
    props: {
        data: Move3DChildren[];
    };
    state: {
        xDepth: number;
        yDepth: number;
        xLimit: number;
        yLimit: number;
        factor: number;
        debug: boolean;
        perspective: number;
    };
}
