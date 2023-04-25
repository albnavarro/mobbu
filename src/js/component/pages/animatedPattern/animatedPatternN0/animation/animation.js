import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, timeline, tween } from '../../../../../mobbu';
import { createGrid } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const animatedPatternN0Animation = ({
    canvas,
    numerOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    stroke,
}) => {
    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let gridData = [];
    let data = [];
    let gridTween = {};
    let gridTimeline = {};
    let ctx = canvas.getContext('2d', { alpha: false });
    const { activeRoute } = mainStore.get();

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Create basic grid.
     */
    gridData = createGrid({
        numerOfRow,
        numberOfColumn,
        cellWidth,
        cellHeight,
        gutter,
    }).items;

    /**
     * Add props to transform.
     */
    data = gridData.map((item) => {
        return { ...item, ...{ scale: 1, rotate: 0 } };
    });

    /**
     * Create tween
     */
    gridTween = tween.createTween({
        ease: 'easeInOutQuad',
        stagger: {
            each: 15,
            from: 'start',
            grid: { col: 11, row: 11, direction: 'row' },
            waitComplete: false,
        },
        data: { scale: 1, rotate: 0 },
    });

    /**
     * Subscribe to tween
     */
    data.forEach((item) => {
        gridTween.subscribeCache(item, ({ scale, rotate }) => {
            item.rotate = rotate;
            item.scale = scale;
        });
    });

    /**
     * Main draw function.
     */
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
                canvas.width / 2 -
                ((width + gutter) * numberOfColumn) / 2 -
                width / 2;

            const offsetYCenter =
                canvas.height / 2 -
                ((height + gutter) * (numerOfRow + 1)) / 2 -
                height / 2;

            const centerX = x + width / 2;
            const centerY = y + height / 2;

            ctx.save();

            ctx.translate(
                Math.round(centerX + offsetXCenter),
                Math.round(centerY + offsetYCenter)
            );
            ctx.rotate((Math.PI / 180) * rotate);

            ctx.scale(scale, scale);
            ctx.translate(-Math.round(centerX), -Math.round(centerY));

            ctx.strokeStyle = stroke;
            ctx.lineWidth = 1;
            ctx.strokeRect(Math.round(x), Math.round(y), width, height);

            ctx.fillStyle = fill;
            ctx.fillRect(Math.round(x), Math.round(y), width, height);

            ctx.restore();
        });
    };

    /**
     * Create timeline.
     */
    gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .label({ name: 'label1' })
        .goTo(gridTween, { scale: 1.5 }, { duration: 1000 })
        .goTo(gridTween, { scale: 0.5 }, { duration: 500 })
        .goTo(gridTween, { rotate: 180, scale: 1.2 }, { duration: 500 })
        .goTo(gridTween, { scale: 1.3 }, { duration: 500 })
        .goTo(gridTween, { scale: 1 }, { duration: 1200 });

    /**
     * Start timeline.
     */
    gridTimeline.play();

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        core.useNextFrame(() => loop());
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
        core.useFrame(() => draw());
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        gridTimeline?.stop();
        isActive = false;
        canvas.classList.remove('active');
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(async () => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const { activeRoute: currentRoute } = mainStore.get();
            if (currentRoute !== activeRoute) return;

            /**
             * Restart loop
             */
            gridTimeline?.play();
            core.useFrame(() => loop());
            canvas.classList.add('active');
        }, 500)
    );

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    /**
     * Destroy.
     */
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
