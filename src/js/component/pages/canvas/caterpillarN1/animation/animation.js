import { core, timeline, tween } from '../../../../../mobbu';
import { clamp } from '../../../../../mobbu/animation/utils/animationUtils';
import { offset } from '../../../../../mobbu/utils/vanillaFunction';
import { mainStore } from '../../../../../mobjs';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
    roundRectCustom,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const caterpillarN1Animation = ({
    canvas,
    numItems,
    width,
    height,
    fill,
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
    let { top, left } = offset(canvas);
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
     *
     */
    squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        const opacityVal = !fill.includes(i) ? relativeIndex * opacity : 1;

        return {
            width: relativeIndex * width,
            height: relativeIndex * height,
            x: 0,
            y: 0,
            hasFill: fill.includes(i),
            opacity: opacityVal,
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
        stagger: { each: rotationEach, from: 'center' },
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

        const context = useOffscreen ? offScreenCtx : ctx;

        context.fillStyle = '#1a1b26';
        context.fillRect(0, 0, canvas.width, canvas.height);
        squareData.forEach(
            ({ width, height, x, y, radius, opacity, rotate, hasFill }, i) => {
                const unitInverse = squareData.length - i;
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
                context.setTransform(
                    xx,
                    xy,
                    -xy,
                    xx,
                    centerX + x + (unitInverse * x) / 20,
                    centerY + y + (unitInverse * y) / 20
                );

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
                    context.fillStyle = `rgba(158, 206, 106, 1)`;
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
        top = offset(canvas).top;
        left = offset(canvas).left;
        draw();
    });

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x, y } = client;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const xCenter = x - canvas.width / 2 - left;
        const yCenter = y - canvas.height / 2 - top;
        centerTween.goTo({
            x: clamp(
                xCenter,
                -winWidth / 2 + 400 + left,
                winWidth / 2 - 400 - left
            ),
            y: clamp(
                yCenter,
                -winHeight / 2 + 200 + top,
                winHeight / 2 - 200 - top
            ),
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
