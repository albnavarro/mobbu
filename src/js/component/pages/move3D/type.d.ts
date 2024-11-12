import { Move3DItem } from './move3DItem/type';

export interface Move3D {
    drag: boolean;
    centerToViewoport: boolean;
    useScroll: boolean;
    perspective: number;
    xDepth: number;
    yDepth: number;
    xLimit: number;
    yLimit: number;
    shape: Move3DChildren[];
}

export interface Move3DChildren {
    props: Move3DItem;
    children: Move3DChildren[];
}
