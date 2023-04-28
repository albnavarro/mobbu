import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, timeline, tween } from '../../../../../mobbu';
import { clamp } from '../../../../../mobbu/animation/utils/animationUtils';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const animatedPatternN1Animation = ({
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
    let centerTween = {};

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
        return { ...item, ...{ scale: 1, mouseX: 0, mouseY: 0 } };
    });

    /**
     * Create rotation tween.
     */
    centerTween = tween.createLerp({
        data: { mouseX: 0, mouseY: 0 },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    data.forEach((item) => {
        centerTween.subscribeCache(item, ({ mouseX, mouseY }) => {
            item.mouseX = mouseX;
            item.mouseY = mouseY;
        });
    });

    /**
     * Create tween
     */
    gridTween = tween.createTween({
        ease: 'easeInOutSine',
        stagger: {
            each: 5,
            from: 'start',
            grid: { col: 15, row: 7, direction: 'row' },
            waitComplete: false,
        },
        data: { scale: 0 },
    });

    /**
     * Subscribe to tween
     */
    data.forEach((item) => {
        gridTween.subscribeCache(item, ({ scale }) => {
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

        const context = offscreen ? offScreenCtx : ctx;

        /**
         * Clear rpevious render.
         */
        context.fillStyle = '#f6f6f6';
        context.fillRect(0, 0, canvas.width, canvas.height);

        data.forEach(
            ({
                x,
                y,
                centerX,
                centerY,
                width,
                height,
                mouseX,
                mouseY,
                scale,
                offsetXCenter,
                offsetYCenter,
            }) => {
                context.save();

                /**
                 * X difference in px form mouse to sqaure.
                 */
                const mouseXparsed =
                    mouseX -
                    (canvas.width - (width + gutter) * numberOfColumn) / 2;

                /**
                 * Y difference in px form mouse to sqaure.
                 */
                const mouseYparsed =
                    mouseY -
                    (canvas.height - (height + gutter) * numberOfRow) / 2;

                /**
                 * Scale value
                 */
                const xScale = (x - mouseXparsed) / 350;
                const yScale = (y - mouseYparsed) / 350;

                /**
                 * Scale factor y and x together.
                 */
                const delta = Math.sqrt(
                    Math.pow(Math.abs(xScale), 2) +
                        Math.pow(Math.abs(yScale), 2)
                );

                /**
                 * Clamp scale factor bwtween .1 and 1.
                 */
                const scaleFactor = clamp(Math.abs(delta), 0.1, 1);

                /**
                 * Center canvas in center of item.
                 */
                context.translate(
                    Math.round(centerX + offsetXCenter),
                    Math.round(centerY + offsetYCenter)
                );

                /**
                 * Scale item
                 */
                context.scale(scaleFactor + scale, scaleFactor + scale);

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
        .goTo(gridTween, { scale: 0.2 }, { duration: 500 });

    /**
     * Start timeline.
     */
    gridTimeline.play();

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x, y } = client;
        centerTween.goTo({ mouseX: x, mouseY: y });
    });

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

    /**
     * On resize.
     */
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
        centerTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        gridTween = null;
        gridTimeline = null;
        centerTween = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
