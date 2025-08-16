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
     * Create data for single tweens
     */
    const initialTweenAroundData = {
        ...getCoordinate({ row: 1, col: 1 }),
        scale: 1,
        rotate: 0,
    };

    let tweenAroundTarget = initialTweenAroundData;

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
        ease: 'easeInOutQuad',
        stagger: {
            each: 10,
            from: 'random',
        },
        data: { scale: 1, rotate: 0 },
    });

    let tweenAround = MobTween.createTimeTween({
        data: tweenAroundTarget,
        duration: 1000,
        ease: 'easeInOutBack',
    });

    let tweenGridRotate = MobTween.createSpring({
        data: tweenRotateTarget,
    });

    /**
     * Subscribe tweens
     */
    data.forEach((item) => {
        tweenGrid.subscribeCache(item, ({ scale, rotate }) => {
            item.rotate = rotate;
            item.scale = scale;
        });
    });

    tweenAround.subscribe((data) => {
        tweenAroundTarget = data;
    });

    tweenGridRotate.subscribe((data) => {
        tweenRotateTarget = data;
    });

    /**
     * Create grid timeline
     */
    let gridTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        autoSet: false,
    });

    gridTimeline
        .goTo(tweenGrid, { scale: 0.2, rotate: 90 }, { duration: 1000 })
        .goTo(tweenGrid, { rotate: 180, scale: 1.2 }, { duration: 500 })
        .goTo(tweenGrid, { scale: 1.3 }, { duration: 500 })
        .goTo(tweenGrid, { scale: 1 }, { duration: 1200 });

    /**
     * Create single item timeline
     */
    let timeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        autoSet: false,
    });

    timeline
        .goTo(tweenAround, {
            x: getCoordinate({ row: 1, col: 8 }).x,
            rotate: 360,
            scale: 2,
        })
        .createGroup({ waitComplete: false })
        .goTo(tweenAround, {
            y: getCoordinate({ row: 8, col: 8 }).y,
            rotate: 180,
        })
        .goTo(
            tweenGridRotate,
            { y: getCoordinate({ row: 0, col: 8 }).y },
            { delay: 500 }
        )
        .closeGroup()
        .label({ name: 'my-label' })
        .createGroup({ waitComplete: false })
        .goTo(tweenAround, {
            x: getCoordinate({ row: 8, col: 1 }).x,
            rotate: 0,
            scale: 1,
        })
        .goTo(
            tweenGridRotate,
            {
                rotate: 360,
                scale: 2,
            },
            { delay: 0 }
        )
        .closeGroup()
        .createGroup({ waitComplete: false })
        .goTo(
            tweenAround,
            { y: getCoordinate({ row: 1, col: 1 }).y, rotate: -180 },
            { duration: 1000 }
        )
        .goTo(
            tweenGridRotate,
            {
                rotate: 0,
                y: getCoordinate({ row: 8, col: 8 }).y,
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
        // context.setTransform(1, 0, 0, 1, 0, 0);
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
            x: tweenAroundTarget.x,
            y: tweenAroundTarget.y,
            width: tweenAroundTarget.width,
            height: tweenAroundTarget.height,
            rotate: tweenAroundTarget.rotate,
            scale: tweenAroundTarget.scale,
            offsetXCenter: tweenAroundTarget.offsetXCenter,
            offsetYCenter: tweenAroundTarget.offsetYCenter,
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

        /**
         * Reset all transform instead save() restore().
         */
        context.setTransform(1, 0, 0, 1, 0, 0);

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

            tweenGrid?.destroy?.();
            tweenAround?.destroy?.();
            tweenGridRotate?.destroy?.();
            timeline?.destroy?.();
            gridTimeline?.destroy?.();

            // @ts-ignore
            tweenGrid = null;
            // @ts-ignore
            tweenAround = null;
            // @ts-ignore
            tweenGridRotate = null;
            // @ts-ignore
            timeline = null;

            // @ts-ignore
            gridTimeline = null;
        },
        play: () => {
            timeline.play();
            gridTimeline.play();
        },
        playReverse: () => {
            timeline.playReverse();
            gridTimeline.play();
        },
        playFromLabel: () => {
            timeline
                .setTween('my-label', [tweenAround, tweenGridRotate])
                .then(() => {
                    timeline.playFrom('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                    gridTimeline.play();
                });
        },
        playFromLabelReverse: () => {
            timeline
                .setTween('my-label', [tweenAround, tweenGridRotate])
                .then(() => {
                    timeline.playFromReverse('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                    gridTimeline.play();
                });
        },
        revertNext: () => {
            timeline.reverseNext();
        },
        pause: () => {
            timeline.pause();
            gridTimeline.pause();
        },
        resume: () => {
            timeline.resume();
            gridTimeline.resume();
        },
        stop: () => {
            timeline.stop();
            gridTimeline.stop();
        },
    };
};
