// @ts-check

import { scroller, tween } from '../../../../../mobMotion';
import { getActiveRoute } from '../../../../../mobjs';
import {
    canvasBackground,
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    getOffsetXCenter,
    getOffsetYCenter,
    roundRectCustom,
    roundRectIsSupported,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { outerHeight } from '../../../../../mobCore/utils';
import { mobCore } from '../../../../../mobCore';

/** @type{import('../type').ScrollerN0Animation} */
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
    let masterSequencer = tween.createMasterSequencer();
    let ctx = canvas.getContext(context, { alpha: false });
    const activeRoute = getActiveRoute();

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
     * Add props to transform.
     * Order by hasFill, so is like z-index: -1.
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
    let staggers = tween.createStaggers({
        items: data,
        stagger,
    });

    /**
     * Create sequencer instances from staggera array
     */

    let sequencersInstances = staggers.map(({ item, start, end }) => {
        const scale = item.hasFill ? 1.1 : 1;

        const sequencer = tween
            .createSequencer({ data: { scale: 0 } })
            .goTo({ scale }, { start, end, ease: 'easeInOutQuad' });

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
                roundRectCustom(
                    /** @type{CanvasRenderingContext2D} */ (context),
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
                    context.fillStyle = '#000';
                    context.fill();
                } else {
                    context.fillStyle = '#fff';
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
    let scrollerInstance = scroller.createScrollTrigger({
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
        fromTo: true,
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
            mobCore.useFrame(() => loop());
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
