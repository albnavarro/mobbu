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
    root?: boolean;
    id: number;
    depth: number;
    rotate?: Rotate;
    range?: number;
    anchorPoint: AnchorPoint;
    animate?: boolean;
    width?: number;
    height?: number;
    offsetX?: number;
    offsetY?: number;
    initialRotate?: number;
    classList?: string;
    component?: {
        tagName: string;
        className?: string;
        props?: any;
    };
}

export type Move3DItemMove = (arg0: {
    delta: number;
    limit: number;
    initialRotate?: number;
    depth: number;
    range?: number;
    rotate?: Rotate;
    anchorPoint: AnchorPoint;
    lerp: any;
}) => void;
