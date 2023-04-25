import { core, timeline, tween } from '../../../../../mobbu';
import { createGrid, roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const animatedPatternN0Animation = ({ canvas }) => {
    let isActive = true;
    let gridData = [];
    let data = [];
    let gridTween = {};
    let gridTimeline = {};
    let ctx = canvas.getContext('2d', { alpha: false });

    const nRow = 10;
    const nCol = 10;
    const cellWidth = 50;
    const cellHeight = 50;
    const gutter = 10;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gridData = createGrid({ nRow, nCol, cellWidth, cellHeight, gutter }).items;
    data = gridData.map((item) => {
        return { ...item, ...{ opacity: 0, rotate: 0 } };
    });

    gridTween = tween.createTween({
        ease: 'easeInOutQuad',
        stagger: {
            each: 15,
            from: 'start',
            // from: { x: 23, y: 10 },
            // grid: { col: 45, row: 45, direction: 'row' },
            waitComplete: false,
        },
        data: { scale: 1, rotate: 0, opacity: 1 },
    });

    data.forEach((item) => {
        gridTween.subscribeCache(item, ({ scale, rotate, opacity }) => {
            item.rotate = rotate;
            item.opacity = opacity;
            item.scale = scale;
        });
    });

    const draw = () => {
        if (!ctx) return;

        /**
         * Get center of canvas.
         */

        /**
         * Clear rpevious render.
         */
        ctx.fillStyle = '#f6f6f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y, width, height, rotate, scale }) => {
            const offsetXCenter =
                canvas.width / 2 - ((width + gutter) * nCol) / 2 - width / 2;

            const offsetYCenter =
                canvas.height / 2 -
                ((height + gutter) * (nRow + 1)) / 2 -
                height / 2;

            const centerX = x + width / 2;
            const centerY = y + height / 2;

            ctx.save();

            ctx.translate(centerX + offsetXCenter, centerY + offsetYCenter);
            ctx.rotate((Math.PI / 180) * rotate);
            ctx.scale(scale, scale);
            ctx.translate(-centerX, -centerY);

            roundRectCustom(ctx, x, y, width, height, 0);

            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.restore();
        });
    };

    gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(gridTween, { scale: 1.5 }, { duration: 1000 })
        .goTo(gridTween, { scale: 0.5 }, { duration: 500 })
        .goTo(gridTween, { rotate: 180, scale: 1.2 }, { duration: 500 })
        .goTo(gridTween, { scale: 1.3 }, { duration: 500 })
        .goTo(gridTween, { opacity: 0.5 }, { duration: 1200 })
        .goTo(gridTween, { opacity: 1, scale: 1 }, { duration: 1200 });

    gridTimeline.play();

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
        gridTween.destroy();
        gridTimeline.destroy();
        unsubscribeResize();
        unWatchResume();
        unWatchPause();
        gridTween = null;
        gridTimeline = null;
        ctx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
