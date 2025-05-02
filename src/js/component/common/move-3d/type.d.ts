import { Move3DItem } from '../Move3D/move-3d-item/type';

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
    ref: {
        container: HTMLElement;
    };
}

export interface Move3DChildren {
    props: Partial<Move3DItem['state']>;
    children?: Move3DChildren[];
}
