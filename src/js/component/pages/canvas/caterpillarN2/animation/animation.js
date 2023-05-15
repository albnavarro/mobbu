import { core, timeline, tween } from '../../../../../mobbu';
import { mainStore } from '../../../../../mobjs';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
    roundRectCustom,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

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
    let ctx = canvas.getContext(context, { alpha: false });
    let squareData = [];
    let userRotation = rotationDefault;
    const { activeRoute } = mainStore.get();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    /**
     *
     */
    squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        const itemWidth = width + (width / 3) * relativeIndex;
        const itemHeight = height + (height / 3) * relativeIndex;
        const opacityVal = !fill.includes(i) ? (numItems - i) * opacity : 1;

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
    });

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Create sequencer.
     */
    const infiniteTween = tween
        .createSequencer({
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
        .label('mylabel', 2);

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
    const syncTimeline = timeline
        .createSyncTimeline({
            repeat: -1,
            yoyo: false,
            duration: 4000,
        })
        .add(infiniteTween);

    /**
     * Draw
     */
    const draw = () => {
        if (!ctx) return;

        if (useOffscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = useOffscreen ? offScreenCtx : ctx;

        context.fillStyle = '#1a1b26';
        context.fillRect(0, 0, canvas.width, canvas.height);

        squareData.forEach(
            ({ width, height, x, y, radius, rotate, hasFill, opacity }) => {
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
                 * Apply scale/rotation/scale all toghether.
                 */
                context.setTransform(xx, xy, -xy, xx, centerX + x, centerY + y);

                /**
                 * Restore canvas center
                 */
                roundRectCustom(
                    context,
                    parseInt(-width / 2),
                    parseInt(-height / 2),
                    width,
                    height,
                    radius
                );

                if (hasFill) {
                    context.fillStyle = `rgba(255, 255, 255, 1)`;
                } else {
                    context.fillStyle = `rgba(26, 27, 38, ${opacity})`;
                    context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    context.stroke();
                }
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
    const loop = () => {
        draw();

        if (!isActive) return;
        core.useNextFrame(() => loop());
    };

    core.useFrame(() => loop());

    /**
     * Play timeline.
     */
    syncTimeline.play();

    /**
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        syncTimeline?.pause();
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
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
            syncTimeline?.resume();
            core.useFrame(() => loop());
        }, 500)
    );

    return {
        destroy: () => {
            isActive = false;
            unsubscribeResize();
            unWatchPause();
            unWatchResume();
            infiniteTween.destroy();
            syncTimeline.destroy();
            ctx = null;
            offscreen = null;
            offScreenCtx = null;
            squareData = [];
        },
        play: () => {
            syncTimeline.stop();
            syncTimeline.play();
        },
        playReverse: () => {
            syncTimeline.stop();
            syncTimeline.playReverse();
        },
        playUseCurrent: () => syncTimeline.play({ useCurrent: true }),
        playReverseUseCurrent: () =>
            syncTimeline.playReverse({ useCurrent: true }),
        playFromLabel: () => {
            syncTimeline.stop();
            syncTimeline.playFrom('mylabel');
        },
        plaFromLabelReverse: () => {
            syncTimeline.stop();
            syncTimeline.playFromReverse('mylabel');
        },
        stop: () => syncTimeline.stop(),
        pause: () => syncTimeline.pause(),
        resume: () => syncTimeline.resume(),
        reverse: () => syncTimeline.reverse(),
        setRotation: (value) => (userRotation = value),
    };
};
