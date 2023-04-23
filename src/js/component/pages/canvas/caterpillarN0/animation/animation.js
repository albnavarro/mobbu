import { core, tween } from '../../../../../mobbu';
import { roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const caterpillarN0Animation = ({
    canvas,
    amountOfPath,
    width,
    height,
    radius,
    fill,
    stroke,
    opacity,
}) => {
    let isActive = true;
    let ctx = canvas.getContext('2d');
    let stemData = [];
    let stemData2 = [];
    let mainTween = {};

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    stemData2 = [...Array(amountOfPath).keys()].map((_item, i) => {
        const count = i;
        const index = count < amountOfPath / 2 ? amountOfPath - count : count;
        const relativeIndex = index - (amountOfPath - index);

        return {
            width:
                Math.sqrt(
                    Math.pow(width * relativeIndex, 2) -
                        Math.pow(
                            ((width * relativeIndex) / amountOfPath) *
                                relativeIndex,
                            2
                        )
                ) * 2,
            height:
                Math.sqrt(
                    Math.pow(height * relativeIndex, 2) -
                        Math.pow(
                            ((height * relativeIndex) / amountOfPath) *
                                relativeIndex,
                            2
                        )
                ) * 2,
            fill,
            stroke,
            opacity: relativeIndex * opacity,
            rotate: 0,
            y: 0,
            relativeIndex,
            index: i,
        };
    });

    stemData = stemData2
        .splice(0, stemData2.length / 2)
        .concat(stemData2.reverse());

    /**
     * Create rotation tween.
     */
    mainTween = tween.createSpring({
        data: { rotate: 0, y: 0 },
        stagger: { each: 5, from: 'center' },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...stemData].forEach((item) => {
        mainTween.subscribeCache(item, ({ rotate }) => {
            item.rotate = rotate;
        });
    });

    const draw = ({ time = 0 }) => {
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stemData.forEach(
            ({
                width,
                height,
                fill,
                opacity,
                stroke,
                rotate,
                relativeIndex,
                index: i,
            }) => {
                /**
                 * Center canvas on bottom right of the screen.
                 */
                ctx.save();
                const offset = Math.sin(time / 1000) * 4 * relativeIndex;
                const offsetInverse =
                    i < amountOfPath / 2
                        ? offset + (15 * relativeIndex) / 2
                        : -offset - (15 * relativeIndex) / 2;

                const spacerY = i < amountOfPath / 2 ? 200 : -400;
                const centerDirection = i < amountOfPath / 2 ? -1 : 1;

                /**
                 * Center canvas in the screen
                 */
                ctx.translate(centerX + width / 2, centerY + height / 2);
                ctx.rotate((Math.PI / 180) * (rotate - 33));
                ctx.translate(
                    parseInt(-centerX - width / 2),
                    parseInt(-centerY - height / 2)
                );
                ctx.globalAlpha = opacity;

                roundRectCustom(
                    ctx,
                    centerX - (width * centerDirection) / 2,
                    centerY - height / 2 + offsetInverse + spacerY,
                    width,
                    height,
                    radius
                );

                ctx.strokeStyle = stroke;
                ctx.stroke();
                ctx.fillStyle = fill;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        );
    };

    /**
     * Loop
     */
    const loop = ({ time = 0 }) => {
        draw({ time });

        if (!isActive) return;
        core.useNextFrame(({ time }) => loop({ time }));
    };

    core.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        core.useFrame(({ time }) => {
            draw({ time });
        });
    });

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x } = client;
        const xCenter = x - canvas.width / 2;
        mainTween.goTo({
            rotate: xCenter / 10,
        });
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        isActive = false;
        canvas.classList.remove('active');
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(() => {
            isActive = true;
            core.useFrame(({ time }) => loop({ time }));
            canvas.classList.add('active');
        }, 500)
    );

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    return () => {
        mainTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        mainTween = null;
        ctx = null;
        stemData = [];
        stemData2 = [];
        isActive = false;
    };
};
