//@ts-check

import { timeline, tween } from '../../../../../mobMotion';
import { getActiveRoute } from '../../../../../mobjs';
import {
    canvasBackground,
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { mobCore } from '../../../../../mobCore';

/** @type{import('../type').AnimatedPatternN0Animation} */
export const animatedPatternN0Animation = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    disableOffcanvas,
    stagger,
    reorder,
}) => {
    /**
     * Check if offscrennCanvas can be used.
     */
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });

    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });

    const activeRoute = getActiveRoute();

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
     * Order byy hasFill, so is like z-index: -1.
     */
    let data = reorder
        ? gridData
              .map((item, i) => {
                  return {
                      ...item,
                      scale: 1,
                      rotate: 0,
                      hasFill: fill.includes(i),
                  };
              })
              .sort((value) => (value.hasFill ? -1 : 1))
              .reverse()
        : gridData.map((item, i) => {
              const hasFill = fill.includes(i);
              return {
                  ...item,
                  scale: 1,
                  rotate: 0,
                  hasFill,
              };
          });

    /**
     * Create tween
     */
    let gridTween = tween.createTween({
        ease: 'easeInOutQuad',
        stagger,
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

        if (useOffscreen && offscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = useOffscreen
            ? offScreenCtx
            : /** @type{CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} */ (
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
                hasFill,
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
                context.beginPath();
                context.rect(
                    Math.round(-centerX + x),
                    Math.round(-centerY + y),
                    width,
                    height
                );

                if (hasFill) {
                    context.fillStyle = `#000000`;
                    context.fill();
                } else {
                    context.fillStyle = '#fff';
                    context.fill();
                    context.strokeStyle = '#ccc';
                    context.stroke();
                }

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
     * Create timeline.
     */
    let gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .label({ name: 'label1' })
        .goTo(gridTween, { scale: 1.5, rotate: 90 }, { duration: 1000 })
        .goTo(gridTween, { scale: 0.5 }, { duration: 500 })
        .goTo(gridTween, { rotate: 180, scale: 1.2 }, { duration: 500 })
        .goTo(gridTween, { scale: 1.3 }, { duration: 500 })
        .goTo(gridTween, { scale: 1 }, { duration: 1200 });

    gridTimeline.onLoopEnd(({ direction, loop }) => {
        console.log(`loop end: ${direction}, ${loop}`);
    });

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
        mobCore.useNextFrame(() => loop());
    };

    /**
     * Start loop.
     */
    mobCore.useFrame(() => {
        loop();
    });

    const unsubscribeResize = mobCore.useResize(() => {
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
        mobCore.useFrame(() => draw());
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
            const currentRoute = getActiveRoute();
            if (currentRoute.route !== activeRoute.route) return;

            /**
             * Restart loop
             */
            gridTimeline?.play();
            mobCore.useFrame(() => loop());
        }, 500);
    });

    /**
     * Destroy.
     */
    return () => {
        gridTween.destroy();
        gridTimeline.destroy();
        unsubscribeResize();
        unWatchPause();
        // @ts-ignore
        gridTween = null;
        // @ts-ignore
        gridTimeline = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
