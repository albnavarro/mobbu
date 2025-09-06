// @ts-check

import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobScroll, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';
import {
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
    roundRectCustom,
    roundRectIsSupported,
} from '@utils/canvas-utils';

/** @type {import('../type').ScrollerN0Animation} */
export const scrollerN0Animation = ({
    canvas,
    canvasScroller,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    stagger,
    reorder,
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
    let masterSequencer = MobTween.createMasterSequencer();
    let ctx = canvas.getContext(context, { alpha: true });
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
     * Add props to transform. Order by hasFill, so is like z-index: -1.
     */
    let data = reorder
        ? gridData
              .map((item, i) => {
                  return {
                      ...item,
                      scale: 0,
                      rotate: 0,
                      hasFill: fill.includes(i),
                  };
              })
              .sort((value) => (value.hasFill ? -1 : 1))
        : gridData.map((item, i) => {
              return {
                  ...item,
                  scale: 0,
                  rotate: 0,
                  hasFill: fill.includes(i),
              };
          });

    /**
     * Create staggers array.
     */
    let staggers = MobTween.createStaggers({
        items: data,
        stagger,
    });

    /**
     * Create sequencer instances from staggera array
     */

    let sequencersInstances = staggers.map(({ item, start, end }) => {
        const scale = item.hasFill ? 1.1 : 1;

        const sequencer = MobTween.createSequencer({ data: { scale: 0 } }).goTo(
            { scale },
            { start, end, ease: 'easeInOutQuad' }
        );

        const unsubscribe = sequencer.subscribe(({ scale }) => {
            item.scale = scale;
        });

        masterSequencer.add(sequencer);
        return { sequencer, unsubscribe };
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
        // context.fillStyle = '#fff';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;

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
                roundRectCustom(
                    /** @type {CanvasRenderingContext2D} */ (context),
                    Math.round(-centerX + x),
                    Math.round(-centerY + y),
                    width,
                    height,
                    5
                );

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

                if (hasFill) {
                    context.fillStyle = `#000000`;
                    context.fill();
                } else {
                    context.strokeStyle = `#000`;
                    // context.fillStyle = `rgba(238, 238, 238, ${opacity})`;
                    context.fillStyle = `rgba(238, 238, 238, 0.9)`;
                    context.stroke();
                    context.fill();

                    if (!useRadius) {
                        context.strokeStyle = '#ccc';
                        context.stroke();
                    }
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
     * Create scrollTrigger.
     */
    let scrollerInstance = MobScroll.createScrollTrigger({
        trigger: canvasScroller,
        propierties: 'tween',
        tween: masterSequencer,
        dynamicStart: {
            position: 'bottom',
            value: () => window.innerHeight,
        },
        dynamicEnd: {
            position: 'bottom',
            value: () => outerHeight(canvasScroller),
        },
        reverse: true,
        ease: true,
        easeType: 'lerp',
    });

    /**
     * Initialize scrollTrigger.
     */
    scrollerInstance.init();

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
            MobCore.useFrame(() => loop());
        }, 500);
    });

    /**
     * Destroy.
     */
    return () => {
        unsubscribeResize();
        unWatchPause();
        sequencersInstances.forEach(({ sequencer, unsubscribe }) => {
            sequencer.destroy();
            unsubscribe();
        });
        sequencersInstances = [];
        masterSequencer.destroy();
        // @ts-ignore
        masterSequencer = null;
        staggers = [];
        scrollerInstance.destroy();
        // @ts-ignore
        scrollerInstance = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
