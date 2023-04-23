import { core, tween } from '../../../../mobbu';
import { clamp } from '../../../../mobbu/animation/utils/animationUtils';
import { navigationStore } from '../../../layout/navigation/store/navStore';

export const mushroomAnimation = ({ canvas }) => {
    let isActive = true;
    let ctx = canvas.getContext('2d');
    let stemData = [];
    let stemData2 = [];
    let mainTween = {};
    const stemNumber = 30;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    stemData2 = [...Array(stemNumber).keys()].map((_item, i) => {
        const count = i;
        const index = count < stemNumber / 2 ? stemNumber - count : count;
        const relativeIndex = index - (stemNumber - index);
        const h = 4;
        const w = 10;

        return {
            /**
             * Circle.
             */
            // width:
            //     Math.sqrt(
            //         Math.pow(w, 2) -
            //             Math.pow((w / stemNumber) * relativeIndex, 2)
            //     ) * 2,
            // height:
            //     Math.sqrt(
            //         Math.pow(h, 2) -
            //             Math.pow((h / stemNumber) * relativeIndex, 2)
            //     ) * 2,

            /**
             * Clessidra.
             */

            width:
                Math.sqrt(
                    Math.pow(w * relativeIndex, 2) -
                        Math.pow(
                            ((w * relativeIndex) / stemNumber) * relativeIndex,
                            2
                        )
                ) * 2,
            height:
                Math.sqrt(
                    Math.pow(h * relativeIndex, 2) -
                        Math.pow(
                            ((h * relativeIndex) / stemNumber) * relativeIndex,
                            2
                        )
                ) * 2,
            color: '#ffff',
            borderColor: '#000',
            opacity: relativeIndex * 0.05,
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stemData.forEach(
            ({
                width,
                height,
                color,
                opacity,
                borderColor,
                rotate,
                relativeIndex,
                index: i,
            }) => {
                /**
                 * Center canvas on bottom right of the screen.
                 */
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                ctx.save();
                const offset = Math.sin(time / 1000) * 2 * relativeIndex;
                const offsetInverse =
                    i < stemNumber / 2
                        ? offset + 15 * relativeIndex
                        : -offset - 15 * relativeIndex;

                /**
                 * Center canvas in the screen
                 */
                ctx.translate(centerX + width / 2, centerY + height / 2);
                const rotateInverse = i < stemNumber / 2 ? rotate : -rotate;
                ctx.rotate((Math.PI / 180) * rotateInverse);
                ctx.translate(
                    parseInt(-centerX - width / 2),
                    parseInt(-centerY - height / 2)
                );
                ctx.globalAlpha = opacity;

                ctx.beginPath();
                ctx.ellipse(
                    centerX,
                    centerY + offsetInverse,
                    width,
                    height,
                    0,
                    0,
                    4 * Math.PI
                );

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
        const { x, y } = client;
        const xCenter = x - canvas.width / 2;
        const yCenter = y - canvas.height / 2;
        mainTween.goTo({
            rotate: xCenter / 40,
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

    return () => {
        mainTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        mainTween = null;
        ctx = null;
        stemData = [];
        isActive = false;
    };
};
