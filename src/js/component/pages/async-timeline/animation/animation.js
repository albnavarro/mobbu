//@ts-check

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import {
    canvasBackground,
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
    roundRectIsSupported,
} from '@utils/canvas-utils';

/** @type {import('../type').AsyncTimelineAnimation} */
export const animatedPatternN0Animation = ({ canvas, disableOffcanvas }) => {
    /**
     * Check if offscrennCanvas can be used.
     */
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });

    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });

    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    let wichContext = useOffscreen ? offScreenCtx : ctx;
    const useRadius = roundRectIsSupported(
        /** @type {CanvasRenderingContext2D} */ (wichContext)
    );
    wichContext = null;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const numberOfRow = 10;
    const numberOfColumn = 10;
    const cellWidth = window.innerHeight / 18;
    const cellHeight = window.innerHeight / 18;
    const gutter = 3;

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
     * Add props to transform. Order byy hasFill, so is like z-index: -1.
     */
    let data = gridData.map((item) => {
        return {
            ...item,
            scale: 1,
            rotate: 0,
        };
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

        /**
         * Clear rpevious render.
         */
        context.fillStyle = canvasBackground;
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
                const rotation = (Math.PI / 180) * rotate;
                const xx = Math.cos(rotation) * scale;
                const xy = Math.sin(rotation) * scale;

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
                if (useRadius) {
                    context.beginPath();
                    context.roundRect(
                        Math.round(-centerX + x),
                        Math.round(-centerY + y),
                        width,
                        height,
                        5
                    );
                } else {
                    context.beginPath();
                    context.rect(
                        Math.round(-centerX + x),
                        Math.round(-centerY + y),
                        width,
                        height
                    );
                }

                context.fillStyle = '#fff';
                context.fill();

                /**
                 * Reset all transform instead save() restore().
                 */
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        );

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

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

    const unsubscribeResize = MobCore.useResize(() => {
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
        MobCore.useFrame(() => draw());
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            // gridTimeline?.stop();
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
            // gridTimeline?.play();
            MobCore.useFrame(() => loop());
        }, 500);
    });

    /**
     * Destroy.
     */
    return {
        destroy: () => {
            // gridTween.destroy();
            // gridTimeline.destroy();
            unsubscribeResize();
            unWatchPause();
            // @ts-ignore
            // gridTween = null;
            // @ts-ignore
            // gridTimeline = null;
            ctx = null;
            offscreen = null;
            offScreenCtx = null;
            gridData = [];
            data = [];
            isActive = false;
        },
        play: () => {
            console.log('play');
        },
        playReverse: () => {
            console.log('playReverse');
        },
        playFromLabel: () => {
            console.log('playFromLabel');
        },
        playFromLabelReverse: () => {
            console.log('playFromLabelReverse');
        },
        revertNext: () => {
            console.log('revertNext');
        },
        pause: () => {
            console.log('pause');
        },
        resume: () => {
            console.log('resume');
        },
        stop: () => {
            console.log('stop');
        },
    };
};
