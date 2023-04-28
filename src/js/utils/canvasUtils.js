export const getCanvasContext = ({ disableOffcanvas }) => {
    const useOffscreen = 'OffscreenCanvas' in window && !disableOffcanvas;
    const context = useOffscreen ? 'bitmaprenderer' : '2d';
    return { useOffscreen, context };
};

export const getOffsetCanvas = ({ useOffscreen, canvas }) => {
    const offscreen = useOffscreen
        ? new OffscreenCanvas(canvas.width, canvas.height)
        : null;
    const offScreenCtx = useOffscreen ? offscreen.getContext('2d') : null;

    return { offscreen, offScreenCtx };
};

export const copyCanvasBitmap = ({ useOffscreen, offscreen, ctx }) => {
    if (useOffscreen) {
        const bitmap = offscreen.transferToImageBitmap();
        ctx.transferFromImageBitmap(bitmap);
    }
};

export const roundRectIsSupported = (ctx) => 'roundRect' in ctx;

export const roundRectCustom = (ctx, x, y, w, h, r) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
};

export const createGrid = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
}) => {
    return [...Array(numberOfRow * numberOfColumn + numberOfRow).keys()].reduce(
        (previous) => {
            const { row, col, items: previousItems } = previous;
            const newCol = col < numberOfColumn ? col + 1 : 0;
            const newRow = newCol === 0 ? row + 1 : row;

            const x = (cellWidth + gutter) * newCol;
            const y = (cellHeight + gutter) * newRow;

            return {
                row: newRow,
                col: newCol,
                items: [
                    ...previousItems,
                    {
                        width: cellWidth,
                        height: cellHeight,
                        x,
                        y,
                        centerX: x + cellWidth / 2,
                        centerY: y + cellHeight / 2,
                        offsetXCenter: getOffsetXCenter({
                            canvasWidth: canvas.width,
                            width: cellWidth,
                            gutter,
                            numberOfColumn,
                        }),
                        offsetYCenter: getOffsetYCenter({
                            canvasHeight: canvas.height,
                            height: cellHeight,
                            gutter,
                            numberOfRow,
                        }),
                        gutter,
                        numberOfColumn,
                    },
                ],
            };
        },
        { row: 0, col: -1, items: [] }
    );
};

export const getOffsetXCenter = ({
    canvasWidth,
    width,
    gutter,
    numberOfColumn,
}) => {
    return (
        canvasWidth / 2 - ((width + gutter) * numberOfColumn) / 2 - width / 2
    );
};

export const getOffsetYCenter = ({
    canvasHeight,
    height,
    gutter,
    numberOfRow,
}) => {
    return (
        canvasHeight / 2 -
        ((height + gutter) * (numberOfRow + 1)) / 2 -
        height / 2
    );
};
