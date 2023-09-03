import { core, timeline, tween } from '../../../../../mobMotion';
import { mainStore } from '../../../../../mobjs';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
    roundRectCustom,
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
    let gridData = [];
    let data = [];
    let gridTween = {};
    let gridTimeline = {};
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
     * Order byy hasFill, so is linke z-index: -1.
     */
    data = reorder
        ? gridData
              .map((item, i) => {
                  return {
                      ...item,
                      ...{ scale: 1, rotate: 0, hasFill: fill.includes(i) },
                  };
              })
              .sort((value) => (value.hasFill ? -1 : 1))
              .reverse()
        : gridData.map((item, i) => {
              const hasFill = fill.includes(i);
              return {
                  ...item,
                  ...{ scale: 1, rotate: 0, hasFill },
              };
          });

    /**
     * Create tween
     */
    gridTween = tween.createTween({
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
                hasFill,
                offsetXCenter,
                offsetYCenter,
            }) => {
                const rotation = (Math.PI / 180) * rotate;
                const xx = Math.cos(rotation) * scale;
                const xy = Math.sin(rotation) * scale;

                /**
                 * Apply scale/rotation/scale all toghether.
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
                roundRectCustom(
                    context,
                    Math.round(-centerX + x),
                    Math.round(-centerY + y),
                    width,
                    height,
                    5
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
        }, 500)
    );

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
