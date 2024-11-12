export interface Move3DItem {
    root: boolean;
    depth: number;
    rotate: 'x' | 'y';
    range: number;
    anchorPoint: 'left' | 'top' | 'right' | 'bottom';
    animate: boolean;
}
