import { Move3DChildren } from '../type';

export interface Move3DPage {
    state: {
        data: Move3DChildren[];
        xDepth: number;
        yDepth: number;
        xLimit: number;
        yLimit: number;
        prevRoute: string;
        nextRoute: string;
    };
}
