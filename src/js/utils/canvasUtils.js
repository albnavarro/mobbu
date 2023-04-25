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

export const createGrid = ({ nRow, nCol, cellWidth, cellHeight }) => {
    return [...Array(nRow * nCol + nRow).keys()].reduce(
        (previous) => {
            const { row, col, items: previousItems } = previous;
            const newCol = col < nCol ? col + 1 : 0;
            const newRow = newCol === 0 ? row + 1 : row;

            const x = cellWidth * newCol;
            const y = cellHeight * newRow;

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
                    },
                ],
            };
        },
        { row: 0, col: -1, items: [] }
    );
};
