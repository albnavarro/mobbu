import { core, timeline, tween } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';
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
}) => {
    /**
     *
     */
    let isActive = true;
    let ctx = canvas.getContext('2d');
    let squareData = [];
    let rotationTween = {};
    let centerTween = {};
    let rectTimeline = {};
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
        ease: 'easeLinear',
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                ctx.save();

                /**
                 * Center canvas
                 */
                ctx.translate(
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
                ctx.rotate((Math.PI / 180) * rotate);

                /**
                 * Restore canvas center
                 */
                ctx.translate(
                    parseInt(-centerX - width / 2),
                    parseInt(-centerY - height / 2)
                );
                ctx.globalAlpha = opacity;
                roundRectCustom(ctx, centerX, centerY, width, height, radius);
                ctx.strokeStyle = borderColor;
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        );
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
        const xCenter = x - canvas.width / 2;
        const yCenter = y - canvas.height / 2;
        centerTween.goTo({ x: xCenter, y: yCenter });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        rectTimeline.pause();
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(() => {
            isActive = true;
            rectTimeline.resume();
            core.useFrame(() => loop());
        }, 800)
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
        squareData = [];
        isActive = false;
    };
};
