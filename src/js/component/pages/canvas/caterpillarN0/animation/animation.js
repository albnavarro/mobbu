//@ts-check

import { MobCore } from '@mobCore';
import { offset } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobTween } from '@mobMotion';
import {
    canvasBackground,
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

/**
 *  @param {object} params
 *  @param {number} params.width
 *  @param {number} params.relativeIndex
 *  @param {number} params.amountOfPath
 *  @returns {number}
 **/
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
 *  @param {object} params
 *  @param {number} params.height
 *  @param {number} params.relativeIndex
 *  @param {number} params.amountOfPath
 *  @returns {number}
 **/
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

/** @type{import('../type').CaterpillarN0Animation} */
export const caterpillarN0Animation = ({
    canvas,
    amountOfPath,
    width,
    height,
    fill,
    stroke,
    opacity,
    spacerY,
    intialRotation,
    perpetualRatio,
    mouseMoveRatio,
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
    let { left } = offset(canvas);
    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    const useRadius = false;

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Setup data.
     */
    let stemData = [...new Array(amountOfPath).keys()].map((_item, i) => {
        const count = i;
        const index = count < amountOfPath / 2 ? amountOfPath - count : count;
        const relativeIndex = index - (amountOfPath - index);

        return {
            width: Math.floor(
                getWithRounded({ width, relativeIndex, amountOfPath })
            ),
            height: Math.floor(
                getHeightRounded({ height, relativeIndex, amountOfPath })
            ),
            fill,
            stroke,
            opacity: relativeIndex * opacity,
            rotate: 0,
            y: 0,
            relativeIndex,
            index: i,
        };
    });

    /**
     * Subdived oginal array in half and reverse the half section.
     */
    let steamDataReorded = stemData
        .splice(0, stemData.length / 2)
        // eslint-disable-next-line unicorn/prefer-spread
        .concat(stemData.reverse());

    /**
     * Create tween.
     */
    let mainTween = MobTween.createSpring({
        data: { rotate: 0, y: 0 },
        stagger: { each: 5, from: 'center' },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...steamDataReorded].forEach((item) => {
        mainTween.subscribeCache(item, ({ rotate }) => {
            item.rotate = rotate;
        });
    });

    /**
     * Main draw function.
     */
    const draw = ({ time = 0 }) => {
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
         * Get center of canvas.
         */
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        /**
         * Clear rpevious render.
         */
        context.fillStyle = canvasBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);

        steamDataReorded.forEach(
            ({ width, height, opacity, rotate, relativeIndex, index: i }) => {
                /**
                 * Pertual movement based on timeframe.
                 */
                const offset =
                    Math.sin(time / 1000) * perpetualRatio * relativeIndex;

                /**
                 * Invert perpetual movement by the two half of array and set multiplier.
                 */
                const offsetInverse =
                    i < amountOfPath / 2
                        ? offset + (15 * relativeIndex) / 2
                        : -offset - (15 * relativeIndex) / 2;

                /**
                 * Space between tho half
                 */
                const centerDirection = i < amountOfPath / 2 ? -1 : 1;

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
                    centerY + height / 2
                );

                if (useRadius) {
                    context.beginPath();
                    context.roundRect(
                        -(width * centerDirection) / 2,
                        -height / 2 +
                            offsetInverse +
                            spacerY(i < amountOfPath / 2),
                        width,
                        height,
                        [200, 0]
                    );
                } else {
                    context.beginPath();
                    context.rect(
                        -(width * centerDirection) / 2,
                        -height / 2 +
                            offsetInverse +
                            spacerY(i < amountOfPath / 2),
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
            }
        );

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Loop
     */
    const loop = ({ time = 0 }) => {
        draw({ time });

        if (!isActive) return;

        MobCore.useNextFrame(({ time }) => loop({ time }));
    };

    /**
     * Start loop.
     */
    MobCore.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * Resize canvas.
     */
    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        left = offset(canvas).left;
        MobCore.useFrame(({ time }) => {
            draw({ time });
        });
    });

    /**
     * @param {object} params
     * @param {number} params.x
     * @returns {void}
     */
    const move = ({ x }) => {
        const xCenter = x - canvas.width / 2 - left;
        mainTween.goTo({
            rotate: xCenter / mouseMoveRatio,
        });
    };

    /**
     * Mouse move.
     */
    const unsubscribeMouseMove = MobCore.useMouseMove(({ client }) => {
        const { x } = client;
        move({ x });
    });

    const unsubscribeTouchMove = MobCore.useTouchMove(({ client }) => {
        const { x } = client;
        move({ x });
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
            MobCore.useFrame(({ time }) => loop({ time }));
        }, 500);
    });

    return () => {
        mainTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unsubscribeTouchMove();
        unWatchPause();
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        // @ts-ignore
        mainTween = null;
        steamDataReorded = [];
        stemData = [];
        isActive = false;
    };
};
