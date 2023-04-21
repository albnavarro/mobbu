import { core, timeline, tween } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

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
    const numItems = 20;
    const squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        return {
            width: relativeIndex * 60,
            height: relativeIndex * 60,
            color: '#fff',
            borderColor: '#000',
            x: 4,
            y: 4,
            opacity: relativeIndex * 0.08,
            radius: 100,
            rotate: 0,
            relativeIndex,
        };
    });

    /**
     * Create rotation tween.
     */
    const rotationTween = tween.createTween({
        data: { rotate: 0 },
        stagger: { each: 15, from: 'edges' },
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
        stagger: { each: 15, from: 'center' },
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
                    relativeIndex,
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
                    Math.floor(centerX + width / 2 + x * i),
                    Math.floor(centerY + height / 2 + y * unitInverse)
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
    const rectTimeline = timeline.createAsyncTimeline({
        repeat: -1,
        yoyo: false,
    });

    /**
     * Anim timeline.
     */
    rectTimeline
        .createGroup({ waitComplete: false })
        .goTo(rotationTween, { rotate: 360 }, { duration: 10000 })
        .goTo(centerTween, { x: 10, y: 10 }, { duration: 5000 })
        .closeGroup()
        .goTo(centerTween, { x: -30, y: -10 }, { duration: 5000 })
        .createGroup({ waitComplete: false })
        .goTo(rotationTween, { rotate: 720 }, { duration: 10000 })
        .goTo(centerTween, { x: -20, y: -40 }, { duration: 5000 })
        .closeGroup()
        .goTo(centerTween, { x: 30, y: 10 }, { duration: 5000 });

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
        unsubscribeResize();
        rotationTween.destroy();
        rectTimeline.destroy();
        unWatchPause();
        unWatchResume();
        isActive = false;
    };
};
