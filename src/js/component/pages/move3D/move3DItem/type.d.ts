export interface Move3DItem {
    root?: boolean;
    depth: number;
    rotate: 'x' | 'y' | 'xy';
    range: number;
    anchorPoint:
        | 'left'
        | 'top'
        | 'right'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right'
        | 'top-left'
        | 'top-right';
    animate: boolean;
}
