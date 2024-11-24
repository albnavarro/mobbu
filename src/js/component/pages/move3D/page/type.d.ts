import { Move3DChildren } from '../type';

export interface Move3DPage {
    state: {
        data: Move3DChildren[];
        prevRoute: string;
        nextRoute: string;
    };
}
