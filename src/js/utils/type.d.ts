export interface GridType {
    row: number;
    col: number;
    items: {
        width: number;
        height: number;
        x: number;
        y: number;
        centerX: number;
        centerY: number;
        offsetXCenter: number;
        offsetYCenter: number;
        gutter: number;
        numberOfColumn: number;
    }[];
}

export type CreateGrid = (arg0: {
    canvas: HTMLCanvasElement;
    numberOfRow: number;
    numberOfColumn: number;
    cellWidth: number;
    cellHeight: number;
    gutter: number;
}) => GridType;
