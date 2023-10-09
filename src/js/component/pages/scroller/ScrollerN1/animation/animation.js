import { tween, scroller } from '../../../../../mobMotion';
import { mainStore } from '../../../../../mobjs';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
    roundRectCustom,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { outerHeight } from '../../../../../mobCore/utils';
import { mobCore } from '../../../../../mobCore';

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

export const scrollerN1Animation = ({
    canvas,
    canvasScroller,
    amountOfPath,
    width,
    height,
    radius,
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
    let stemData = [];
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
    stemData = [...new Array(amountOfPath).keys()].map((_item, i) => {
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
    });

    /**
     * Create tween.
     */
    let scrollerTween = tween.createScrollerTween({
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

        stemData.forEach(({ width, height, opacity, rotate, index }) => {
            const unitInverse = stemData.length / 2 - index;

            /**
             * Center canvas in the screen
             *
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
                centerY + unitInverse * 19
            );

            /**
             * Shape
             */
            roundRectCustom(
                context,
                -width / 2,
                -height / 2 + unitInverse * 19,
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
        });

        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create scrollTrigger.
     */
    let scrollerInstance = scroller.createScrollTrigger({
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
     * Inizialize scrollTrigger.
     */
    scrollerInstance.init();

    /**
     * Loop
     */
    const loop = ({ time = 0 }) => {
        draw({ time });

        if (!isActive) return;

        mobCore.useNextFrame(({ time }) => loop({ time }));
    };

    /**
     * Start loop.
     */
    mobCore.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * Resize canvas.
     */
    const unsubscribeResize = mobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        mobCore.useFrame(() => {
            draw();
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
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
            mobCore.useFrame(({ time }) => loop({ time }));
        }, 500);
    });

    return () => {
        scrollerTween.destroy();
        unsubscribeResize();
        unWatchResume();
        unWatchPause();
        scrollerTween.destroy();
        scrollerTween = null;
        scrollerInstance.destroy();
        scrollerInstance = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        scrollerTween = null;
        stemData = [];
        isActive = false;
    };
};
