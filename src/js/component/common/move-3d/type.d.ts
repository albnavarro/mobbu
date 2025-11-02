import { Move3DItem } from './move-3d-item/type';

export interface Move3D {
    props: {
        drag: boolean;
        centerToViewoport: boolean;
        perspective: number;
        xDepth: number;
        yDepth: number;
        xLimit: number;
        yLimit: number;
        factor: number;
        shape: Move3DChildren[];
        debug: boolean;
        afterInit: (element: HTMLElement) => void;
        onUpdate: (arg0: {
            delta: number;
            deltaX: number;
            deltaY: number;
        }) => void;
    };
    state: {
        useScroll: boolean;
    };
    ref: {
        container: HTMLElement;
    };
}

export interface Move3DChildren {
    props: Partial<Move3DItem['props']> & Partial<Move3DItem['state']>;
    children?: Move3DChildren[];
}
