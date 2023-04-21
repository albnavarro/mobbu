import { core, timeline, tween } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';

export const caterpillarCanvasAnimation = ({ canvas }) => {
    /**
     *
     */
    let isActive = true;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    /**
     *
     */
    const numItems = 40;
    const squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        return {
            width: i * 30,
            height: i * 30,
            color: '#fff',
            borderColor: '#000',
            x: 4,
            y: 4,
            opacity: relativeIndex * 0.05,
            radius: 50,
            rotate: 0,
        };
    });

    /**
     * Create rotation tween.
     */
    const rotationTween = tween.createTween({
        data: { rotate: 0 },
        stagger: { each: 3, from: 'center' },
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
    const centerTween = tween.createTween({
        data: { x: 0, y: 0 },
        stagger: { each: 3, from: 'center' },
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
        canvas.width = canvas.width;

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
                const centerX = canvas.width / 2 - width / 2;
                const centerY = canvas.height / 2 - height / 2;
                ctx.save();

                /**
                 * Center canvas
                 */
                ctx.translate(
                    centerX + width / 2 + x * i,
                    centerY + height / 2 + y * i
                );
                ctx.rotate((Math.PI / 180) * rotate);
                // ctx.scale(0.5, 0.5);

                /**
                 * Restore canvas center
                 */
                ctx.translate(-centerX - width / 2, -centerY - height / 2);
                ctx.globalAlpha = opacity;
                roundRectCustom(ctx, centerX, centerY, width, height, radius);
                ctx.stroke();
                // ctx.fill();
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        );
    };

    /**
     * Create timeline
     */
    const rectTimeline = timeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
    });

    /**
     * Anim timeline.
     */
    rectTimeline
        .createGroup({ waitComplete: false })
        .goTo(rotationTween, { rotate: 360 }, { duration: 6000 })
        .goTo(centerTween, { x: 30, y: 10 }, { duration: 3000 })
        .closeGroup()
        .goTo(centerTween, { x: -30, y: -10 }, { duration: 3000 });

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

    return () => {
        unsubscribeResize();
        rotationTween.destroy();
        rectTimeline.destroy();
        isActive = false;
    };
};
