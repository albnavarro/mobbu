//@ts-check

import { MobCore } from '@mobCore';
import { offset } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobMotionCore, MobTimeline, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
} from '@utils/canvas-utils';

/** @type {import('../type').AnimatedPatternN1Animation} */
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

    // eslint-disable-next-line prefer-const
    let { useOffscreen, context } = getCanvasContext({ disableOffcanvas });

    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let { top, left } = offset(canvas);
    let ctx = canvas.getContext(context, { alpha: true });

    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Create basic grid.
     */
    let gridData = createGrid({
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
    let data = gridData
        .map((item, i) => {
            return {
                ...item,
                scale: 0,
                mouseX: 0,
                mouseY: 0,
                hasFill: fill.includes(i),
            };
        })
        .toSorted((value) => (value.hasFill ? -1 : 1));

    /**
     * Create mouse tween.
     */
    let centerTween = MobTween.createLerp({
        data: { mouseX: 0, mouseY: 0 },
    });

    /**
     * Subscribe rect to mouse tween.
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
    let gridTween = MobTween.createTimeTween({
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

        if (useOffscreen && offscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = useOffscreen
            ? offScreenCtx
            : /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} */ (
                  ctx
              );

        if (!context) return;

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;

        /**
         * Draw all black element.
         *
         * - Element to be masked.
         */
        data.forEach(
            ({
                x,
                y,
                width,
                height,
                mouseX,
                mouseY,
                scale,
                hasFill,
                offsetXCenter,
                offsetYCenter,
            }) => {
                if (!hasFill) return;

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
                const scaleFactor = MobMotionCore.clamp(Math.abs(delta), 0, 2);

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
                    Math.floor(offsetXCenter + x),
                    Math.floor(offsetYCenter + y)
                );

                /**
                 * Draw.
                 */
                context.beginPath();
                context.rect(
                    Math.floor(-width / 2),
                    Math.floor(-height / 2),
                    width,
                    height
                );
                context.fillStyle = `#000000`;
                context.fill();

                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        );

        /**
         * Start mask mode.
         */
        context.globalCompositeOperation = 'destination-out';

        /**
         * Draw all white element
         *
         * - Mask element.
         */
        data.forEach(
            ({
                x,
                y,
                width,
                height,
                mouseX,
                mouseY,
                scale,
                hasFill,
                offsetXCenter,
                offsetYCenter,
            }) => {
                if (hasFill) return;

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
                const scaleFactor = MobMotionCore.clamp(Math.abs(delta), 0, 2);

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
                    Math.floor(offsetXCenter + x),
                    Math.floor(offsetYCenter + y)
                );

                /**
                 * Draw.
                 */
                context.beginPath();
                context.rect(
                    Math.floor(-width / 2),
                    Math.floor(-height / 2),
                    width,
                    height
                );
                // context.fillStyle = `red`;
                context.fill();

                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        );

        /**
         * Stop mask mode. Enable if other operation is needed.
         */
        // context.globalCompositeOperation = 'source-over';

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create timeline.
     */
    let gridTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        autoSet: false,
    }).goTo(gridTween, { scale: 0.3 }, { duration: 1000 });

    /**
     * Start timeline.
     */
    gridTimeline.play();

    /**
     * @param {object} params
     * @param {number} params.x
     * @param {number} params.y
     * @returns {void}
     */
    const move = ({ x, y }) => {
        centerTween.goTo({ mouseX: x - left, mouseY: y - top }).catch(() => {});
    };

    const unsubscribeMouseMove = MobCore.useMouseMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    const unsubscribeTouchMove = MobCore.useTouchMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        MobCore.useNextFrame(() => loop());
    };

    /**
     * Start loop.
     */
    MobCore.useFrame(() => {
        loop();
    });

    /**
     * On resize.
     */
    const unsubscribeResize = MobCore.useResize(() => {
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
        MobCore.useFrame(() => draw());
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            gridTimeline?.stop();
            isActive = false;
            return;
        }

        setTimeout(async () => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const currentRoute = MobJs.getActiveRoute();
            if (currentRoute.route !== activeRoute.route) return;

            /**
             * Restart loop
             */
            gridTimeline?.play();
            MobCore.useFrame(() => loop());
        }, 500);
    });

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
        unWatchPause();
        // @ts-ignore
        gridTween = null;
        // @ts-ignore
        gridTimeline = null;
        // @ts-ignore
        centerTween = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        gridData = [];
        isActive = false;

        // @ts-ignore
        data = null;

        // @ts-ignore
        context = null;
    };
};
