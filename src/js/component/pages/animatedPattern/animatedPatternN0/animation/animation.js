import { core } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';

export const animatedPatternN0Animation = ({ canvas }) => {
    let isActive = true;
    let data = [];
    let ctx = canvas.getContext('2d', { alpha: false });

    const nRow = 4;
    const nCol = 9;
    const cellWidth = 50;
    const cellHeight = 50;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    data = [...Array(nRow * nCol + (nRow - 1)).keys()].reduce(
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
        { row: 0, col: 0, items: [] }
    );

    const draw = () => {
        if (!ctx) return;

        /**
         * Get center of canvas.
         */
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        /**
         * Clear rpevious render.
         */
        ctx.fillStyle = '#f6f6f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        data.items.forEach(({ x, y, width, height }) => {
            ctx.save();
            ctx.translate(centerX + width / 2, centerY + height / 2);
            ctx.translate(
                parseInt(-centerX - width / 2),
                parseInt(-centerY - height / 2)
            );
            roundRectCustom(ctx, x, y, width, height, 0);

            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.restore();
        });
    };

    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        core.useFrame(({ time }) => {
            draw({ time });
        });
    });

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    draw();

    return () => {
        unsubscribeResize();
        ctx = null;
        data = [];
        isActive = false;
    };
};
