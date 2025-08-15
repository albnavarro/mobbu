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
    getOffsetXCenter,
    getOffsetYCenter,
    roundRectIsSupported,
} from '@utils/canvas-utils';

/** @type {import('../type').AsyncTimelineAnimation} */
export const animatedPatternN0Animation = ({ canvas, disableOffcanvas }) => {
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
    let gridTween = MobTween.createTimeTween({
        data: tweenTarget,
        duration: 1000,
        ease: 'easeInOutBack',
    });

    let gridSpring = MobTween.createSpring({
        data: tweenTarget,
    });

    let gridTweenRotate = MobTween.createTimeTween({
        data: tweenRotateTarget,
        duration: 1000,
        ease: 'easeInOutBack',
    });

    /**
     * Subscribe tweens
     */
    gridTween.subscribe((data) => {
        tweenTarget = data;
    });

    gridSpring.subscribe((data) => {
        tweenTarget = data;
    });

    gridTweenRotate.subscribe((data) => {
        tweenRotateTarget = data;
    });

    /**
     * Create timeline
     */
    let timeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
    });

    timeline
        .goTo(gridTween, { x: () => getCoordinate({ row: 1, col: 8 }).x })
        .goTo(gridTween, { y: () => getCoordinate({ row: 8, col: 8 }).y });

    /**
     * @param {object} params
     * @param {number} params.x
     * @param {number} params.y
     * @param {number} params.centerX
     * @param {number} params.centerY
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
        centerX,
        centerY,
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
            Math.round(centerX + offsetXCenter),
            Math.round(centerY + offsetYCenter)
        );

        /**
         * Draw.
         */
        if (useRadius) {
            context.beginPath();
            context.roundRect(
                Math.round(-centerX + x),
                Math.round(-centerY + y),
                width,
                height,
                5
            );
        } else {
            context.beginPath();
            context.rect(
                Math.round(-centerX + x),
                Math.round(-centerY + y),
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
                centerX,
                centerY,
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
                    centerX,
                    centerY,
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
            centerX: tweenTarget.centerX,
            centerY: tweenTarget.centerY,
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
            centerX: tweenRotateTarget.centerX,
            centerY: tweenRotateTarget.centerY,
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

    const unsubscribeResize = MobCore.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        timeline.stop();

        /**
         * Update offset position to center grid in canvas.
         */
        data.forEach((item) => {
            const { width, height, gutter, numberOfColumn } = item;

            item.offsetXCenter = getOffsetXCenter({
                canvasWidth: canvas.width,
                width,
                gutter,
                numberOfColumn,
            });

            item.offsetYCenter = getOffsetYCenter({
                canvasHeight: canvas.height,
                height,
                gutter,
                numberOfRow,
            });
        });

        /**
         * Update tween & lerp data
         */
        tweenTarget.offsetXCenter = getOffsetXCenter({
            canvasWidth: canvas.width,
            width: tweenTarget.width,
            gutter: tweenTarget.gutter,
            numberOfColumn,
        });

        tweenTarget.offsetYCenter = getOffsetYCenter({
            canvasHeight: canvas.height,
            height: tweenTarget.height,
            gutter: tweenTarget.gutter,
            numberOfRow,
        });

        initialTweenData.offsetXCenter = tweenTarget.offsetXCenter;
        initialTweenData.offsetYCenter = tweenTarget.offsetYCenter;
        gridTween.setData({ ...initialTweenData });
        gridSpring.setData({ ...initialTweenData });

        /**
         * Update fixed tween
         */
        tweenRotateTarget.offsetXCenter = getOffsetXCenter({
            canvasWidth: canvas.width,
            width: tweenRotateTarget.width,
            gutter: tweenRotateTarget.gutter,
            numberOfColumn,
        });

        tweenRotateTarget.offsetYCenter = getOffsetYCenter({
            canvasHeight: canvas.height,
            height: tweenRotateTarget.height,
            gutter: tweenRotateTarget.gutter,
            numberOfRow,
        });

        initialTweenRotateData.offsetXCenter = tweenRotateTarget.offsetXCenter;
        initialTweenRotateData.offsetYCenter = tweenRotateTarget.offsetYCenter;
        gridTweenRotate.setData({ ...initialTweenRotateData });

        /**
         * Render.
         */
        MobCore.useFrame(() => draw());
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
            unsubscribeResize();
            unWatchPause();
            ctx = null;
            offscreen = null;
            offScreenCtx = null;
            gridData = [];
            data = [];
            isActive = false;

            gridTween.destroy();
            gridSpring.destroy();
            gridTweenRotate.destroy();
            timeline.destroy();

            // @ts-ignore
            gridTween = null;
            // @ts-ignore
            gridSpring = null;
            // @ts-ignore
            gridTweenRotate = null;
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
            console.log('playFromLabel');
        },
        playFromLabelReverse: () => {
            console.log('playFromLabelReverse');
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
