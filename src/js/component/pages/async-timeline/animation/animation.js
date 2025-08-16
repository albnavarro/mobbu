//@ts-check

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobTimeline, MobTween } from '@mobMotion';
import {
    canvasBackground,
    copyCanvasBitmap,
    createGrid,
    getCanvasContext,
    getOffsetCanvas,
    roundRectIsSupported,
} from '@utils/canvas-utils';

/** @type {import('../type').AsyncTimelineAnimation} */
export const asyncTimelineanimation = ({ canvas, disableOffcanvas }) => {
    /**
     * Check if offscrennCanvas can be used.
     */
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });

    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });

    const activeRoute = MobJs.getActiveRoute();

    /**
     * If offscreen is supported use.
     */
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    let wichContext = useOffscreen ? offScreenCtx : ctx;
    const useRadius = roundRectIsSupported(
        /** @type {CanvasRenderingContext2D} */ (wichContext)
    );
    wichContext = null;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const numberOfRow = 10;
    const numberOfColumn = 10;
    const cellWidth = window.innerHeight / 18;
    const cellHeight = window.innerHeight / 18;
    const gutter = 3;

    /**
     * Create basic grid.
     */
    let gridData = createGrid({
        canvas,
        numberOfRow,
        numberOfColumn,
        cellWidth,
        cellHeight,
        gutter,
    }).items;

    /**
     * Add props to transform. Order byy hasFill, so is like z-index: -1.
     */
    let data = gridData.map((item) => {
        return {
            ...item,
            scale: 1,
            rotate: 0,
        };
    });

    /**
     * Start from 0,0
     *
     * @param {object} params
     * @param {number} params.row
     * @param {number} params.col
     */
    const getCoordinate = ({ row, col }) => {
        const rowIndex = (numberOfColumn + 1) * row;
        return data[rowIndex + col];
    };

    /**
     * Create date for tweens
     */
    const initialTweenData = {
        ...getCoordinate({ row: 1, col: 1 }),
        scale: 1,
        rotate: 0,
    };

    let tweenTarget = initialTweenData;

    const initialTweenRotateData = {
        ...getCoordinate({ row: 4, col: 5 }),
        scale: 1,
        rotate: 0,
    };

    let tweenRotateTarget = initialTweenRotateData;

    /**
     * Create tween
     */
    let tweenGrid = MobTween.createTimeTween({
        data: tweenTarget,
        duration: 1000,
        ease: 'easeInOutBack',
    });

    let tweenGridRotate = MobTween.createSpring({
        data: tweenRotateTarget,
    });

    /**
     * Subscribe tweens
     */
    tweenGrid.subscribe((data) => {
        tweenTarget = data;
    });

    tweenGridRotate.subscribe((data) => {
        tweenRotateTarget = data;
    });

    /**
     * Create timeline
     */
    let timeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        autoSet: false,
    });

    timeline
        .goTo(tweenGrid, {
            x: () => getCoordinate({ row: 1, col: 8 }).x,
            rotate: 360,
            scale: 2,
        })
        .goTo(tweenGrid, {
            y: () => getCoordinate({ row: 8, col: 8 }).y,
            rotate: 180,
        })
        .label({ name: 'my-label' })
        .createGroup({ waitComplete: false })
        .goTo(tweenGrid, {
            x: () => getCoordinate({ row: 8, col: 1 }).x,
            rotate: 0,
            scale: 1,
        })
        .goTo(
            tweenGridRotate,
            {
                rotate: 360,
                scale: 3,
            },
            { delay: 500 }
        )
        .closeGroup()
        .createGroup({ waitComplete: false })
        .goTo(
            tweenGrid,
            { y: () => getCoordinate({ row: 1, col: 1 }).y, rotate: -180 },
            { duration: 1000 }
        )
        .goTo(
            tweenGridRotate,
            {
                rotate: 0,
                scale: 1,
            },
            { delay: 200 }
        )
        .closeGroup();

    /**
     * @param {object} params
     * @param {number} params.x
     * @param {number} params.y
     * @param {number} params.width
     * @param {number} params.height
     * @param {number} params.rotate
     * @param {number} params.scale
     * @param {number} params.offsetYCenter
     * @param {number} params.offsetXCenter
     * @param {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} params.context
     * @param {string} params.fill
     */
    const drawItem = ({
        x,
        y,
        width,
        height,
        rotate,
        scale,
        offsetXCenter,
        offsetYCenter,
        context,
        fill,
    }) => {
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
            offsetXCenter + x,
            offsetYCenter + y
        );

        /**
         * Draw.
         */
        if (useRadius) {
            context.beginPath();
            context.roundRect(
                Math.round(-width / 2),
                Math.round(-height / 2),
                width,
                height,
                5
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

        context.fillStyle = fill;
        context.fill();

        /**
         * Reset all transform instead save() restore().
         */
        context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**
     * Main draw function.
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

        /**
         * Clear rpevious render.
         */
        context.fillStyle = canvasBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);

        /**
         * Grid
         */
        data.forEach(
            ({
                x,
                y,
                width,
                height,
                rotate,
                scale,
                offsetXCenter,
                offsetYCenter,
            }) => {
                drawItem({
                    x,
                    y,
                    width,
                    height,
                    rotate,
                    scale,
                    offsetXCenter,
                    offsetYCenter,
                    context,
                    fill: '#ffffff',
                });
            }
        );

        /**
         * Tween1
         */
        drawItem({
            x: tweenTarget.x,
            y: tweenTarget.y,
            width: tweenTarget.width,
            height: tweenTarget.height,
            rotate: tweenTarget.rotate,
            scale: tweenTarget.scale,
            offsetXCenter: tweenTarget.offsetXCenter,
            offsetYCenter: tweenTarget.offsetYCenter,
            context,
            fill: '#000000',
        });

        /**
         * Fixed tween
         */
        drawItem({
            x: tweenRotateTarget.x,
            y: tweenRotateTarget.y,
            width: tweenRotateTarget.width,
            height: tweenRotateTarget.height,
            rotate: tweenRotateTarget.rotate,
            scale: tweenRotateTarget.scale,
            offsetXCenter: tweenRotateTarget.offsetXCenter,
            offsetYCenter: tweenRotateTarget.offsetYCenter,
            context,
            fill: '#000000',
        });

        // @ts-ignore
        copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        MobCore.useNextFrame(() => loop());
    };

    /**
     * Start loop.
     */
    MobCore.useFrame(() => {
        loop();
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            // gridTimeline?.stop();
            isActive = false;
            return;
        }

        setTimeout(async () => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const currentRoute = MobJs.getActiveRoute();
            if (currentRoute.route !== activeRoute.route) return;

            /**
             * Restart loop
             */
            // gridTimeline?.play();
            MobCore.useFrame(() => loop());
        }, 500);
    });

    /**
     * Destroy.
     */
    return {
        destroy: () => {
            unWatchPause();
            ctx = null;
            offscreen = null;
            offScreenCtx = null;
            gridData = [];
            data = [];
            isActive = false;

            tweenGrid.destroy();
            tweenGridRotate.destroy();
            timeline.destroy();

            // @ts-ignore
            tweenGrid = null;
            // @ts-ignore
            tweenGridRotate = null;
            // @ts-ignore
            timeline = null;
        },
        play: () => {
            timeline.play();
        },
        playReverse: () => {
            timeline.playReverse();
        },
        playFromLabel: () => {
            timeline
                .setTween('my-label', [tweenGrid, tweenGridRotate])
                .then(() => {
                    timeline.playFrom('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                });
        },
        playFromLabelReverse: () => {
            timeline
                .setTween('my-label', [tweenGrid, tweenGridRotate])
                .then(() => {
                    timeline.playFromReverse('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                });
        },
        revertNext: () => {
            timeline.reverseNext();
        },
        pause: () => {
            timeline.pause();
        },
        resume: () => {
            timeline.resume();
        },
        stop: () => {
            timeline.stop();
        },
    };
};
