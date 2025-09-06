//@ts-check

import { MobCore } from '@mobCore';
import { offset } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobMotionCore, MobTimeline, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';
import {
    copyCanvasBitmap,
    getCanvasContext,
    getOffsetCanvas,
} from '@utils/canvas-utils';

/** @type {import('../type').CaterpillarN1Animation} */
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
    let ctx = canvas.getContext(context, { alpha: true });
    let { top, left } = offset(canvas);
    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });

    const useRadius = true;

    /**
     * Initial misure.
     */
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let squareData = [...Array.from({ length: numItems }).keys()].map(
        (_item, i) => {
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
        }
    );

    /**
     * Create rotation tween.
     */
    let rotationTween = MobTween.createTimeTween({
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
    let centerTween = MobTween.createSpring({
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
            : /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} */ (
                  ctx
              );

        if (!context) return;

        // context.fillStyle = '#fff';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;

        squareData.forEach(
            ({ width, height, x, y, rotate, hasFill, opacity }, i) => {
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
                    context.fillStyle = '#000';
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
     * Create timeline
     */
    let rectTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
        autoSet: false,
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
        MobCore.useNextFrame(() => loop());
    };

    MobCore.useFrame(() => loop());

    /**
     * Resize canvas.
     */
    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        top = offset(canvas).top;
        left = offset(canvas).left;
        draw();
    });

    /**
     * @param {object} params
     * @param {number} params.x
     * @param {number} params.y
     * @returns {void}
     */
    const move = ({ x, y }) => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const xCenter = x - canvas.width / 2 - left;
        const yCenter = y - canvas.height / 2 - top;
        centerTween
            .goTo({
                x: MobMotionCore.clamp(
                    xCenter,
                    -winWidth / 2 + 400 + left,
                    winWidth / 2 - 400 - left
                ),
                y: MobMotionCore.clamp(
                    yCenter,
                    -winHeight / 2 + 200 + top,
                    winHeight / 2 - 200 - top
                ),
            })
            .catch(() => {});
    };

    const unsubscribeMouseMove = MobCore.useMouseMove(({ client }) => {
        const { x, y } = client;
        move({ x, y });
    });

    const unsubscribeTouchMove = MobCore.useTouchMove(({ client }) => {
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
            rotationTween?.pause();
            centerTween?.pause();
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
            rectTimeline?.resume();
            rotationTween?.resume();
            centerTween?.resume();
            MobCore.useFrame(() => loop());
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
