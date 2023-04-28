import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, timeline, tween } from '../../../../../mobbu';
import { clamp } from '../../../../../mobbu/animation/utils/animationUtils';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
    roundRectCustom,
    roundRectIsSupported,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const caterpillarN1Animation = ({
    canvas,
    numItems,
    width,
    height,
    color,
    borderColor,
    opacity,
    radius,
    rotationDuration,
    rotationEach,
    centerEach,
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
    let rotationTween = {};
    let centerTween = {};
    let rectTimeline = {};
    const { activeRoute } = mainStore.get();
    const useRoundRect = roundRectIsSupported(ctx);

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
     *
     */
    squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        return {
            width: relativeIndex * width,
            height: relativeIndex * height,
            color,
            borderColor,
            x: 0,
            y: 0,
            opacity: relativeIndex * opacity,
            radius,
            rotate: 0,
            relativeIndex,
        };
    });

    /**
     * Create rotation tween.
     */
    rotationTween = tween.createTween({
        data: { rotate: 0 },
        stagger: { each: rotationEach, from: 'edges' },
        ease: 'easeLinear',
        relative: true,
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...squareData].forEach((item) => {
        rotationTween.subscribeCache(item, ({ rotate }) => {
            item.rotate = rotate;
        });
    });

    /**
     * Create rotation tween.
     */
    centerTween = tween.createSpring({
        data: { x: 0, y: 0 },
        stagger: { each: centerEach, from: 'end' },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...squareData].forEach((item) => {
        centerTween.subscribeCache(item, ({ x, y }) => {
            item.x = x;
            item.y = y;
        });
    });

    /**
     * Draw
     */
    const draw = () => {
        if (!ctx) return;

        if (useOffscreen) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
        }

        const context = offscreen ? offScreenCtx : ctx;

        context.fillStyle = '#f6f6f6';
        context.fillRect(0, 0, canvas.width, canvas.height);
        squareData.forEach(
            (
                {
                    width,
                    height,
                    x,
                    y,
                    color,
                    opacity,
                    radius,
                    borderColor,
                    rotate,
                },
                i
            ) => {
                const unitInverse = squareData.length - i;
                const centerX = canvas.width / 2 - width / 2;
                const centerY = canvas.height / 2 - height / 2;
                context.save();

                /**
                 * Center canvas
                 */
                context.translate(
                    /**
                     * offset
                     */
                    centerX + width / 2 + x + (unitInverse * x) / 10,
                    centerY + height / 2 + y + (unitInverse * y) / 10

                    /**
                     * Centered.
                     */
                    // centerX + width / 2 + x,
                    // centerY + height / 2 + y
                );
                context.rotate((Math.PI / 180) * rotate);

                /**
                 * Restore canvas center
                 */
                context.translate(
                    parseInt(-centerX - width / 2),
                    parseInt(-centerY - height / 2)
                );

                context.globalAlpha = opacity;

                if (useRoundRect) {
                    context.beginPath();
                    context.roundRect(centerX, centerY, width, height, radius);
                } else {
                    roundRectCustom(
                        context,
                        centerX,
                        centerY,
                        width,
                        height,
                        radius
                    );
                }
                context.strokeStyle = borderColor;
                context.stroke();
                context.fillStyle = color;
                context.fill();
                context.globalAlpha = 1;
                context.restore();
            }
        );

        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create timeline
     */
    rectTimeline = timeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
    });

    /**
     * Anim timeline.
     */
    rectTimeline.goTo(
        rotationTween,
        { rotate: 360 },
        { duration: rotationDuration }
    );

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    /**
     * Play
     */
    rectTimeline.play();

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
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x, y } = client;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const xCenter = x - canvas.width / 2;
        const yCenter = y - canvas.height / 2;
        centerTween.goTo({
            x: clamp(xCenter, -winWidth / 2 + 400, winWidth / 2 - 400),
            y: clamp(yCenter, -winHeight / 2 + 200, winHeight / 2 - 200),
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        rectTimeline?.pause();
        canvas.classList.remove('active');
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
            rectTimeline?.resume();
            core.useFrame(() => loop());
            canvas.classList.add('active');
        }, 500)
    );

    return () => {
        rotationTween.destroy();
        centerTween.destroy();
        rectTimeline.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchPause();
        unWatchResume();
        rotationTween = null;
        centerTween = null;
        rectTimeline = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        squareData = [];
        isActive = false;
    };
};
