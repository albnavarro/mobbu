type AnchorPoint =
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'center';

type Rotate = 'x' | 'y' | 'xy' | '';

export interface Move3DItem {
    state: {
        root?: boolean;
        id: any;
        depth: number;
        rotate: Rotate;
        range: number;
        anchorPoint: AnchorPoint;
        animate: boolean;
        width: string;
        height: string;
        offsetX: string;
        offsetY: string;
        initialRotate: number;
        initialDepth: number;
        classList: string;
        component?: {
            tagName: string;
            className?: string;
            props?: any;
        };
    };
    methods: {
        move: (arg0: { delta: number; factor: number }) => void;
    };
}

export type Move3DItemMove = (arg0: {
    delta: number;
    factor: number;
    initialRotate?: number;
    depth: number;
    range?: number;
    rotate?: Rotate;
    anchorPoint: AnchorPoint;
    lerp: any;
}) => void;
