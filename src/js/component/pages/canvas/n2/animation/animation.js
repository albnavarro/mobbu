//@ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobTimeline, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
} from '@utils/canvas-utils';

/**
 * @param {object} params
 * @param {any} params.value
 * @param {import('src/js/mob/mob-motion/animation/utils/timeline/type').DirectionType} params.direction
 * @param {boolean} params.isForced
 */
const logAddMethods = ({ value, direction, isForced }) => {
    if (isForced) return;
    console.log(`current: ${value}, direction: ${direction}`);
};

/** @type {import('../type').CaterpillarN2Animation} */
export const caterpillarN2Animation = ({
    canvas,
    numItems,
    width,
    height,
    radius,
    fill,
    opacity,
    xAmplitude,
    yAmplitude,
    duration,
    friction,
    rotationDefault,
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
    let ctx = canvas.getContext(context, { alpha: true });
    let userRotation = rotationDefault;
    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    // let wichContext = useOffscreen ? offScreenCtx : ctx;
    // const useRadius = roundRectIsSupported(wichContext) && !detectSafari();
    // wichContext = null;

    const useRadius = true;

    let squareData = [...Array.from({ length: numItems }).keys()].map(
        (_item, i) => {
            const relativeIndex =
                i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

            const itemWidth = width + (width / 3) * relativeIndex;
            const itemHeight = height + (height / 3) * relativeIndex;
            const opacityVal = fill.includes(i) ? 1 : (numItems - i) * opacity;

            return {
                width: itemWidth,
                height: itemHeight,
                x: 0,
                y: 0,
                hasFill: fill.includes(i),
                opacity: opacityVal,
                radius,
                rotate: 0,
            };
        }
    );

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let infiniteTween = MobTween.createSequencer({
        stagger: { each: 6 },
        data: { x: duration / 4, rotate: 0 },
        duration,
    })
        .goTo(
            { x: duration + duration / 4 },
            { start: 0, end: duration, ease: 'easeLinear' }
        )
        .goTo(
            { rotate: () => -userRotation },
            { start: 0, end: 5, ease: 'easeInOutBack' }
        )
        .goTo({ rotate: 0 }, { start: 5, end: duration, ease: 'easeInOutBack' })
        .label('mylabel', 2)
        .add(({ isForced, direction }) => {
            logAddMethods({ isForced, direction, value: 1 });
        }, 1)
        .add(({ isForced, direction }) => {
            logAddMethods({ isForced, direction, value: 5 });
        }, 5)
        .add(({ isForced, direction }) => {
            logAddMethods({ isForced, direction, value: 9 });
        }, 9);

    /**
     * Subscribe sequencer to timeline.
     */
    squareData.forEach((item) => {
        infiniteTween.subscribeCache(item, ({ x, rotate }) => {
            const val = x / friction;
            const factor = 2 / (3 - Math.cos(2 * val));
            const xr = factor * Math.cos(val) * xAmplitude;
            const yr = ((factor * Math.sin(2 * val)) / 2) * yAmplitude;
            item.x = xr;
            item.y = yr;
            item.rotate = rotate;
        });
    });

    /**
     * Create timeline.
     */
    let syncTimeline = MobTimeline.createSyncTimeline({
        repeat: -1,
        yoyo: false,
        duration: 4000,
    }).add(infiniteTween);

    syncTimeline.onLoopEnd(({ loop, direction }) => {
        console.log(`loop end: ${loop} , ${direction}`);
    });

    /**
     * Draw
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

        // context.fillStyle = '#fff';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;

        squareData.forEach(
            ({ width, height, x, y, rotate, hasFill, opacity }) => {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                /**
                 * Center canvas
                 */

                const scale = 1;
                const rotation = (Math.PI / 180) * rotate;
                const xx = Math.cos(rotation) * scale;
                const xy = Math.sin(rotation) * scale;

                /**
                 * Apply scale/rotation/scale all together.
                 */
                context.setTransform(xx, xy, -xy, xx, centerX + x, centerY + y);

                /**
                 * Shape
                 */
                if (useRadius) {
                    context.beginPath();
                    context.roundRect(
                        Math.round(-width / 2),
                        Math.round(-height / 2),
                        width,
                        height,
                        [40, 40]
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

                if (hasFill) {
                    context.fillStyle = `#000000`;
                } else {
                    context.strokeStyle = `#000`;
                    context.fillStyle = `rgba(238, 238, 238, ${opacity})`;
                    context.stroke();
                }

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

    MobCore.useFrame(() => loop());

    /**
     * Play timeline.
     */
    syncTimeline.play();

    /**
     * Resize canvas.
     */
    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            isActive = false;
            syncTimeline?.pause();
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
            syncTimeline?.resume();
            MobCore.useFrame(() => loop());
        }, 500);
    });

    return {
        destroy: () => {
            isActive = false;
            unsubscribeResize();
            unWatchPause();
            infiniteTween.destroy();
            // @ts-ignore
            infiniteTween = null;
            syncTimeline.destroy();
            // @ts-ignore
            syncTimeline = null;
            ctx = null;
            offscreen = null;
            offScreenCtx = null;
            squareData = [];
        },
        play: () => {
            syncTimeline.play();
        },
        playReverse: () => {
            syncTimeline.playReverse();
        },
        playUseCurrent: () => syncTimeline.play({ useCurrent: true }),
        playReverseUseCurrent: () =>
            syncTimeline.playReverse({ useCurrent: true }),
        playFromLabel: () => {
            syncTimeline.playFrom('mylabel');
        },
        plaFromLabelReverse: () => {
            syncTimeline.playFromReverse('mylabel');
        },
        stop: () => syncTimeline.stop(),
        pause: () => syncTimeline.pause(),
        resume: () => syncTimeline.resume(),
        reverse: () => syncTimeline.reverse(),
        setRotation: (value) => (userRotation = value),
    };
};
