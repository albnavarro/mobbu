// @ts-check

export const canvasBackground = '#e8e8e8';

/**
 * @param {object} params
 * @param {boolean} params.disableOffcanvas
 * @returns {{ useOffscreen: boolean; context: 'bitmaprenderer' | '2d' }}
 */
export const getCanvasContext = ({ disableOffcanvas }) => {
    const useOffscreen = 'OffscreenCanvas' in globalThis && !disableOffcanvas;
    const context = useOffscreen ? 'bitmaprenderer' : '2d';
    return { useOffscreen, context };
};

/**
 * @param {object} params
 * @param {boolean} params.useOffscreen
 * @param {HTMLCanvasElement} params.canvas
 * @returns {{
 *     offscreen: OffscreenCanvas | null;
 *     offScreenCtx: OffscreenCanvasRenderingContext2D | undefined | null;
 * }}
 */
export const getOffsetCanvas = ({ useOffscreen, canvas }) => {
    const offscreen = useOffscreen
        ? new OffscreenCanvas(canvas.width, canvas.height)
        : null;
    const offScreenCtx = useOffscreen ? offscreen?.getContext('2d') : null;

    return { offscreen, offScreenCtx };
};

/**
 * @param {object} params
 * @param {boolean} params.useOffscreen
 * @param {OffscreenCanvas | null} params.offscreen
 * @param {ImageBitmapRenderingContext | null} params.ctx
 * @returns {void}
 */
export const copyCanvasBitmap = ({ useOffscreen, offscreen, ctx }) => {
    if (useOffscreen && offscreen && ctx) {
        const bitmap = offscreen.transferToImageBitmap();
        ctx.transferFromImageBitmap(bitmap);
    }
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @returns {boolean}
 */
export const roundRectIsSupported = (ctx) => 'roundRect' in ctx;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} r
 * @returns {void}
 */
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

/**
 * @type {import('./type').CreateGrid}
 */
export const createGrid = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
}) => {
    /** @type {import('./type').GridType} */
    const initValue = { row: 0, col: -1, items: [] };

    return [
        ...Array.from({
            length: numberOfRow * numberOfColumn + numberOfRow,
        }).keys(),
    ].reduce((previous) => {
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
    }, initValue);
};

/**
 * @param {object} params
 * @param {number} params.canvasWidth
 * @param {number} params.width
 * @param {number} params.gutter
 * @param {number} params.numberOfColumn
 * @returns {number}
 */
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

/**
 * @param {object} params
 * @param {number} params.canvasHeight
 * @param {number} params.height
 * @param {number} params.gutter
 * @param {number} params.numberOfRow
 * @returns {number}
 */
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
