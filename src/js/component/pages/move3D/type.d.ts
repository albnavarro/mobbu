import { Move3DItem } from './move3DItem/type';

export interface Move3D {
    state: {
        drag: boolean;
        centerToViewoport: boolean;
        useScroll: boolean;
        perspective: number;
        xDepth: number;
        yDepth: number;
        xLimit: number;
        yLimit: number;
        shape: Move3DChildren[];
        debug: boolean;
    };
}

export interface Move3DChildren {
    props: Partial<Move3DItem['state']>;
    children: Move3DChildren[];
}
