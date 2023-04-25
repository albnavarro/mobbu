import { core, tween } from '../../../../../mobbu';
import {
    outerHeight,
    outerWidth,
} from '../../../../../mobbu/utils/vanillaFunction';
import { roundRectCustom } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

function getWithRounded({ width, relativeIndex, amountOfPath }) {
    return (
        Math.sqrt(
            Math.pow(width * relativeIndex, 2) -
                Math.pow(
                    ((width * relativeIndex) / amountOfPath) * relativeIndex,
                    2
                )
        ) * 2
    );
}

function getHeightRounded({ height, relativeIndex, amountOfPath }) {
    return (
        Math.sqrt(
            Math.pow(height * relativeIndex, 2) -
                Math.pow(
                    ((height * relativeIndex) / amountOfPath) * relativeIndex,
                    2
                )
        ) * 2
    );
}

export const caterpillarN0Animation = ({
    canvas,
    wrap,
    amountOfPath,
    width,
    height,
    radius,
    fill,
    stroke,
    opacity,
    spacerY,
    intialRotation,
    perpetualRatio,
    mouseMoveRatio,
}) => {
    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     *
     */
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker('../workers/canvas.js', {
        type: 'module',
    });
    /**
     *
     */

    let stemData = [];
    let steamDataReorded = [];
    let mainTween = {};

    stemData = [...Array(amountOfPath).keys()].map((_item, i) => {
        const count = i;
        const index = count < amountOfPath / 2 ? amountOfPath - count : count;
        const relativeIndex = index - (amountOfPath - index);

        return {
            width: Math.floor(
                getWithRounded({ width, relativeIndex, amountOfPath })
            ),
            height: Math.floor(
                getHeightRounded({ height, relativeIndex, amountOfPath })
            ),
            fill,
            stroke,
            opacity: relativeIndex * opacity,
            rotate: 0,
            y: 0,
            relativeIndex,
            index: i,
        };
    });

    /**
     * Subdived oginal array in half and reverse the half section.
     */
    steamDataReorded = stemData
        .splice(0, stemData.length / 2)
        .concat(stemData.reverse());

    /**
     * Create tween.
     */
    mainTween = tween.createSpring({
        data: { rotate: 0, y: 0 },
        stagger: { each: 5, from: 'center' },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    [...steamDataReorded].forEach((item) => {
        mainTween.subscribeCache(item, ({ rotate }) => {
            item.rotate = rotate;
        });
    });

    worker.postMessage(
        {
            canvas: offscreen,
        },
        [offscreen]
    );

    const sendData = ({ time }) => {
        worker.postMessage({
            steamDataReorded,
            time,
            radius,
            spacerY: 100,
            amountOfPath,
            intialRotation,
            perpetualRatio,
            canvasWidth: outerWidth(wrap),
            canvasHeight: outerHeight(wrap),
        });
    };

    /**
     * Loop
     */
    const loop = ({ time = 0 }) => {
        sendData({ time });

        if (!isActive) return;
        core.useNextFrame(({ time }) => loop({ time }));
    };

    /**
     * Start loop.
     */
    core.useFrame(({ time }) => {
        loop({ time });
    });

    /**
     * Resize canvas.
     */
    const unsubscribeResize = core.useResize(() => {
        // canvas.width = outerWidth(wrap);
        // canvas.height = outerHeight(wrap);
        core.useFrame(({ time }) => {
            sendData({ time });
        });
    });

    /**
     * Mouse move.
     */
    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x } = client;
        const xCenter = x - canvas.width / 2;
        mainTween.goTo({
            rotate: xCenter / mouseMoveRatio,
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
        steamDataReorded = [];
        stemData = [];
        isActive = false;
        worker.terminate();
    };
};
