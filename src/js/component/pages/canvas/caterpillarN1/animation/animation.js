//@ts-check

import { timeline, tween } from '../../../../../mobMotion';
import { clamp } from '../../../../../mobMotion/animation/utils/animationUtils';
import {
    canvasBackground,
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
} from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';
import { offset } from '../../../../../mobCore/utils';
import { mobCore } from '../../../../../mobCore';
import { getActiveRoute } from '../../../../../mobjs';

/** @type{import('../type').CaterpillarN1Animation} */
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
    let { top, left } = offset(canvas);
    const activeRoute = getActiveRoute();

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
     *
     */
    let squareData = [...new Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        const opacityVal = fill.includes(i) ? 1 : relativeIndex * opacity;

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
    let rotationTween = tween.createTween({
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
    let centerTween = tween.createSpring({
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

        context.fillStyle = canvasBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);
        squareData.forEach(
            ({ width, height, x, y, opacity, rotate, hasFill }, i) => {
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
                 * Apply scale/rotation/scale all together.
                 */
                context.setTransform(
                    xx,
                    xy,
                    -xy,
                    xx,
                    centerX + x + (unitInverse * x) / 20,
                    centerY + y + (unitInverse * y) / 20
                );

                if (useRadius) {
                    context.beginPath();
                    context.roundRect(
                        Math.round(-width / 2),
                        Math.round(-height / 2),
                        width,
                        height,
                        [200, 0]
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

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Create timeline
     */
    let rectTimeline = timeline.createAsyncTimeline({
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
     * Play
     */
    rectTimeline.play();

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        mobCore.useNextFrame(() => loop());
    };

    mobCore.useFrame(() => loop());

    /**
     * Resize canvas.
     */
    const unsubscribeResize = mobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        top = offset(canvas).top;
        left = offset(canvas).left;
        draw();
    });

    const move = ({ x, y }) => {
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
    };

    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    const unsubscribeTouchMove = mobCore.useTouchMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            isActive = false;
            rectTimeline?.pause();
            return;
        }

        setTimeout(() => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const currentRoute = getActiveRoute();
            if (currentRoute.route !== activeRoute.route) return;

            /**
             * Restart loop
             */
            rectTimeline?.resume();
            mobCore.useFrame(() => loop());
        }, 500);
    });

    return () => {
        rotationTween.destroy();
        centerTween.destroy();
        rectTimeline.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unsubscribeTouchMove();
        unWatchPause();
        // @ts-ignore
        rotationTween = null;
        // @ts-ignore
        centerTween = null;
        // @ts-ignore
        rectTimeline = null;
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        squareData = [];
        isActive = false;
    };
};
