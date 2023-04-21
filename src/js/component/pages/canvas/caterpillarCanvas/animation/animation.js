import { core, timeline, tween } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const caterpillarCanvasAnimation = ({ canvas, numItems }) => {
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
    numItems = 20;
    squareData = [...Array(numItems).keys()].map((_item, i) => {
        const relativeIndex =
            i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;

        return {
            width: relativeIndex * 60,
            height: relativeIndex * 60,
            color: '#fff',
            borderColor: '#000',
            x: 4,
            y: 4,
            opacity: relativeIndex * 0.1,
            radius: 100,
            rotate: 0,
            relativeIndex,
        };
    });

    /**
     * Create rotation tween.
     */
    rotationTween = tween.createTween({
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
    centerTween = tween.createTween({
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
                    centerX + width / 2 + x * i,
                    centerY + height / 2 + y * unitInverse
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
