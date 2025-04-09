// @ts-check

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { MobCore } from '@mobCore';
import { outerHeight } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobScroll, MobTween } from '@mobMotion';
import {
    canvasBackground,
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
} from '@utils/canvas-utils';

/**
 * @param {object} params
 * @param {number} params.width
 * @param {number} params.relativeIndex
 * @param {number} params.amountOfPath
 * @returns {number}
 */
function getWithRounded({ width, relativeIndex, amountOfPath }) {
    return (
        Math.sqrt(
            Math.pow(width * relativeIndex, 2) -
                Math.pow(
                    ((width * relativeIndex) / amountOfPath) * relativeIndex,
                    2
                )
        ) * 2
    );
}

/**
 * @param {object} params
 * @param {number} params.height
 * @param {number} params.relativeIndex
 * @param {number} params.amountOfPath
 * @returns {number}
 */
function getHeightRounded({ height, relativeIndex, amountOfPath }) {
    return (
        Math.sqrt(
            Math.pow(height * relativeIndex, 2) -
                Math.pow(
                    ((height * relativeIndex) / amountOfPath) * relativeIndex,
                    2
                )
        ) * 2
    );
}

/** @type {import('../type').ScrollerN1Animation} */
export const scrollerN1Animation = ({
    canvas,
    canvasScroller,
    amountOfPath,
    width,
    height,
    opacity,
    intialRotation,
    endRotation,
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
    let ctx = canvas.getContext(context, { alpha: false });
    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    // let wichContext = useOffscreen ? offScreenCtx : ctx;
    // const useRadius = roundRectIsSupported(wichContext) && !detectSafari();
    // wichContext = null;

    const useRadius = false;

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Setup data.
     */
    let stemData = [...Array.from({ length: amountOfPath }).keys()].map(
        (_item, i) => {
            const relativeIndex =
                i >= amountOfPath / 2
                    ? amountOfPath / 2 + (amountOfPath / 2 - i)
                    : i;

            return {
                width: Math.floor(
                    getWithRounded({ width, relativeIndex, amountOfPath })
                ),
                height: Math.floor(
                    getHeightRounded({ height, relativeIndex, amountOfPath })
                ),
                opacity: relativeIndex * opacity,
                rotate: 0,
                relativeIndex,
                index: i,
            };
        }
    );

    /**
     * Create tween.
     */
    let scrollerTween = MobTween.createScrollerTween({
        from: { rotate: 0 },
        to: { rotate: endRotation },
        stagger: { each: 5, from: 'center' },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...stemData].forEach((item) => {
        scrollerTween.subscribeCache(item, ({ rotate }) => {
            item.rotate = rotate;
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

        /**
         * Get center of canvas.
         */
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        /**
         * Clear rpevious render.
         */
        context.fillStyle = canvasBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);

        stemData.forEach(({ width, height, opacity, rotate, index }) => {
            const unitInverse = stemData.length / 2 - index;

            /**
             * Center canvas in the screen
             */

            const scale = 1;
            const rotation = (Math.PI / 180) * (rotate - intialRotation);
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
                centerX,
                centerY + unitInverse * 19
            );

            /**
             * Shape
             */
            if (useRadius) {
                context.beginPath();
                context.roundRect(
                    -width / 2,
                    -height / 2 + unitInverse * 19,
                    width,
                    height,
                    150
                );
            } else {
                context.beginPath();
                context.rect(
                    Math.round(-width / 2),
                    Math.round(-height / 2),
                    width,
                    height
                );
            }

            /**
             * Color.
             */
            context.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            context.stroke();
            context.fill();

            /**
             * Reset all transform instead save() restore().
             */
            context.setTransform(1, 0, 0, 1, 0, 0);
        });

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create scrollTrigger.
     */
    let scrollerInstance = MobScroll.createScrollTrigger({
        trigger: canvasScroller,
        propierties: 'tween',
        tween: scrollerTween,
        dynamicStart: {
            position: 'bottom',
            value: () => window.innerHeight,
        },
        dynamicEnd: {
            position: 'bottom',
            value: () => outerHeight(canvasScroller),
        },
        ease: true,
        easeType: 'spring',
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

    /**
     * Resize canvas.
     */
    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        MobCore.useFrame(() => {
            draw();
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            isActive = false;
            return;
        }

        setTimeout(() => {
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

    return () => {
        scrollerTween.destroy();
        unsubscribeResize();
        unWatchPause();
        scrollerTween.destroy();
        // @ts-ignore
        scrollerTween = null;
        scrollerInstance.destroy();
        // @ts-ignore
        scrollerInstance = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        // @ts-ignore
        scrollerTween = null;
        stemData = [];
        isActive = false;
    };
};
