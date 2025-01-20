import { Move3DChildren } from '../type';

export interface Move3DPage {
    state: {
        data: Move3DChildren[];
        xDepth: number;
        yDepth: number;
        factor: number;
        debug: boolean;
        perspective: number;
        prevRoute: string;
        nextRoute: string;
    };
}
