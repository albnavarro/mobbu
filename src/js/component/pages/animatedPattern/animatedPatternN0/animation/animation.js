import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, timeline, tween } from '../../../../../mobbu';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const animatedPatternN0Animation = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    stroke,
    disableOffcanvas,
}) => {
    /**
     * Check if offscrennCanvas can be used.
     */
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });

    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let gridData = [];
    let data = [];
    let gridTween = {};
    let gridTimeline = {};
    let ctx = canvas.getContext(context, { alpha: false });
    const { activeRoute } = mainStore.get();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Create basic grid.
     */
    gridData = createGrid({
        canvas,
        numberOfRow,
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
            each: 5,
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

        if (useOffscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = useOffscreen ? offScreenCtx : ctx;

        /**
         * Clear rpevious render.
         */
        context.fillStyle = '#1a1b26';
        context.fillRect(0, 0, canvas.width, canvas.height);

        data.forEach(
            ({
                x,
                y,
                centerX,
                centerY,
                width,
                height,
                rotate,
                scale,
                offsetXCenter,
                offsetYCenter,
            }) => {
                context.save();

                /**
                 * Center canvas in center of item.
                 */
                context.translate(
                    Math.round(centerX + offsetXCenter),
                    Math.round(centerY + offsetYCenter)
                );

                /**
                 * Rotate item.
                 */
                context.rotate((Math.PI / 180) * rotate);

                /**
                 * Scale item
                 */
                context.scale(scale, scale);

                /**
                 * Resent center.
                 */
                context.translate(-Math.round(centerX), -Math.round(centerY));

                /**
                 * Draw.
                 */
                context.fillStyle = fill;
                context.fillRect(Math.round(x), Math.round(y), width, height);

                context.strokeStyle = stroke;
                context.lineWidth = 1;
                context.strokeRect(Math.round(x), Math.round(y), width, height);

                context.restore();
            }
        );

        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
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

        /**
         * Update offset position to center grid in canvas.
         */
        data.forEach((item) => {
            const { width, height, gutter, numberOfColumn } = item;

            item.offsetXCenter = getOffsetXCenter({
                canvasWidth: canvas.width,
                width,
                gutter,
                numberOfColumn,
            });

            item.offsetYCenter = getOffsetYCenter({
                canvasHeight: canvas.height,
                height,
                gutter,
                numberOfRow,
            });
        });

        /**
         * Render.
         */
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
        offscreen = null;
        offScreenCtx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
