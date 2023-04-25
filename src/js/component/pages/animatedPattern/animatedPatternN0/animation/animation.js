import { core } from '../../../../../mobbu';
import { createGrid, roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { originalData } from '../../../test/data';

export const animatedPatternN0Animation = ({ canvas }) => {
    let isActive = true;
    let gridData = [];
    let data = [];
    let ctx = canvas.getContext('2d', { alpha: false });

    const nRow = 7;
    const nCol = 20;
    const cellWidth = 50;
    const cellHeight = 50;
    const gutter = 10;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gridData = createGrid({ nRow, nCol, cellWidth, cellHeight, gutter }).items;
    data = gridData.map((item) => {
        return { ...item, ...{ opacity: 0, rotate: 0 } };
    });

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

        data.forEach(({ x, y, width, height }) => {
            ctx.save();

            ctx.translate(centerX + width / 2, centerY + height / 2);
            ctx.translate(
                parseInt(-centerX - width / 2),
                parseInt(-centerY - height / 2)
            );

            const halfColLenght =
                ((width + gutter) * (nCol + 1)) / 2 - gutter / 2;
            const halfRowLenght =
                ((height + gutter) * (nRow + 2)) / 2 - gutter / 2;

            roundRectCustom(
                ctx,
                x + centerX - halfColLenght,
                y + centerY - halfRowLenght,
                width,
                height,
                0
            );

            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.restore();
        });
    };

    /**
     * Loop
     */
    const loop = ({ time = 0 }) => {
        draw({ time });

        if (!isActive) return;
        core.useNextFrame(({ time }) => loop({ time }));
    };

    /**
     * Start loop.
     */
    core.useFrame(({ time }) => {
        loop({ time });
    });

    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        core.useFrame(({ time }) => {
            draw({ time });
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        canvas.classList.remove('active');
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(() => {
            isActive = true;
            core.useFrame(({ time }) => loop({ time }));
            canvas.classList.add('active');
        }, 500)
    );

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    return () => {
        unsubscribeResize();
        unWatchResume();
        unWatchPause();
        ctx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
