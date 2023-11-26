import { timeline, tween } from '../../../../../mobMotion';
import { clamp } from '../../../../../mobMotion/animation/utils/animationUtils';
import { mainStore } from '../../../../../mobjs';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { offset } from '../../../../../mobCore/utils';
import { mobCore } from '../../../../../mobCore';

export const animatedPatternN1Animation = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
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
    let { top, left } = offset(canvas);
    let ctx = canvas.getContext(context, { alpha: false });
    const defaultFill = '#000';
    const highlightFill = '#fff';
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
    data = gridData
        .map((item, i) => {
            return {
                ...item,
                scale: 0,
                mouseX: 0,
                mouseY: 0,
                hasFill: fill.includes(i),
            };
        })
        .sort((value) => (value.hasFill ? -1 : 1));

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
            from: 'center',
            // grid: { col: 15, row: 7, direction: 'row' },
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
                mouseX,
                mouseY,
                scale,
                hasFill,
                offsetXCenter,
                offsetYCenter,
            }) => {
                /**
                 * X difference in px form mouse to square.
                 */
                const mouseXparsed =
                    mouseX -
                    (canvas.width - (width + gutter) * numberOfColumn) / 2;

                /**
                 * Y difference in px form mouse to square.
                 */
                const mouseYparsed =
                    mouseY -
                    (canvas.height - (height + gutter) * numberOfRow) / 2;

                /**
                 * Scale value
                 */
                const xScale = (x - mouseXparsed) / 250;
                const yScale = (y - mouseYparsed) / 250;

                /**
                 * Scale factor y and x together.
                 */
                const delta = Math.sqrt(
                    Math.pow(Math.abs(xScale), 2) +
                        Math.pow(Math.abs(yScale), 2)
                );

                /**
                 * Clamp scale factor between .1 and 1.
                 */
                const scaleFactor = clamp(Math.abs(delta), 0, 2);

                /**
                 * Basic data for setTransform.
                 */
                const rotation = 0;
                const xx = Math.cos(rotation) * (scaleFactor + scale);
                const xy = Math.sin(rotation) * (scaleFactor + scale);

                /**
                 * Apply scale/rotation/scale all together.
                 */
                context.setTransform(
                    xx,
                    xy,
                    -xy,
                    xx,
                    Math.round(centerX + offsetXCenter),
                    Math.round(centerY + offsetYCenter)
                );

                /**
                 * Draw.
                 */
                context.beginPath();
                context.rect(
                    Math.round(-centerX + x),
                    Math.round(-centerY + y),
                    width,
                    height
                );

                context.fillStyle = hasFill ? highlightFill : defaultFill;
                context.fill();

                /**
                 * Reset all transform instead save() restore().
                 */
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        );

        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create timeline.
     */
    gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(gridTween, { scale: 0.3 }, { duration: 1000 });

    /**
     * Start timeline.
     */
    gridTimeline.play();

    const move = ({ x, y }) => {
        centerTween.goTo({ mouseX: x - left, mouseY: y - top });
    };

    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    const unsubscribeTouchMove = mobCore.useTouchMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        mobCore.useNextFrame(() => loop());
    };

    /**
     * Start loop.
     */
    mobCore.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * On resize.
     */
    const unsubscribeResize = mobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        top = offset(canvas).top;
        left = offset(canvas).left;

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
        mobCore.useFrame(() => draw());
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        gridTimeline?.stop();
        isActive = false;
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
            mobCore.useFrame(() => loop());
        }, 500)
    );

    /**
     * Destroy.
     */
    return () => {
        gridTween.destroy();
        gridTimeline.destroy();
        centerTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unsubscribeTouchMove();
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
