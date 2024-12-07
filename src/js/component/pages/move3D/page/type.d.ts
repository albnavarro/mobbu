import { Move3DChildren } from '../type';

export interface Move3DPage {
    state: {
        data: Move3DChildren[];
        xDepth: number;
        yDepth: number;
        factor: number;
        prevRoute: string;
        nextRoute: string;
    };
}
