import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, tween } from '../../../../../mobbu';
import { offset } from '../../../../../mobbu/utils/vanillaFunction';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
    roundRectCustom,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

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

export const caterpillarN0Animation = ({
    canvas,
    amountOfPath,
    width,
    height,
    radius,
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
    let stemData = [];
    let steamDataReorded = [];
    let mainTween = {};
    let { left } = offset(canvas);
    const { activeRoute } = mainStore.get();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Setup data.
     */
    stemData = [...Array(amountOfPath).keys()].map((_item, i) => {
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
    steamDataReorded = stemData
        .splice(0, stemData.length / 2)
        .concat(stemData.reverse());

    /**
     * Create tween.
     */
    mainTween = tween.createSpring({
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

        if (useOffscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = useOffscreen ? offScreenCtx : ctx;

        /**
         * Get center of canvas.
         */
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        /**
         * Clear rpevious render.
         */
        context.fillStyle = '#1a1b26';
        context.fillRect(0, 0, canvas.width, canvas.height);

        steamDataReorded.forEach(
            ({ width, height, opacity, rotate, relativeIndex, index: i }) => {
                /**
                 * Pertual movment based on timeframe.
                 */
                const offset =
                    Math.sin(time / 1000) * perpetualRatio * relativeIndex;

                /**
                 * Invert perpetual movment by the two half of array and set multiplier.
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
                 * Apply scale/rotation/scale all toghether.
                 */
                context.setTransform(
                    xx,
                    xy,
                    -xy,
                    xx,
                    centerX,
                    centerY + height / 2
                );

                /**
                 * Shape
                 */
                roundRectCustom(
                    context,
                    -(width * centerDirection) / 2,
                    -height / 2 + offsetInverse + spacerY(i < amountOfPath / 2),
                    width,
                    height,
                    radius
                );

                /**
                 * Color.
                 */
                context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                context.fillStyle = `rgba(26, 27, 38, ${opacity})`;
                context.stroke();
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
     * Loop
     */
    const loop = ({ time = 0 }) => {
        draw({ time });

        if (!isActive) return;

        core.useNextFrame(({ time }) => loop({ time }));
    };

    /**
     * Start loop.
     */
    core.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        left = offset(canvas).left;
        core.useFrame(({ time }) => {
            draw({ time });
        });
    });

    /**
     * Mouse move.
     */
    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x } = client;
        const xCenter = x - canvas.width / 2 - left;
        mainTween.goTo({
            rotate: xCenter / mouseMoveRatio,
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        canvas.classList.remove('active');
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () => {
        setTimeout(() => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const { activeRoute: currentRoute } = mainStore.get();
            if (currentRoute !== activeRoute) return;

            /**
             * Restart loop
             */
            core.useFrame(({ time }) => loop({ time }));
            canvas.classList.add('active');
        }, 500);
    });

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    return () => {
        mainTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        mainTween = null;
        steamDataReorded = [];
        stemData = [];
        isActive = false;
    };
};
