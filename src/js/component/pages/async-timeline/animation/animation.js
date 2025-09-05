//@ts-check

import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import { MobTimeline, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';
import {
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
    let ctx = canvas.getContext(context, { alpha: true });

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
    const gutter = 1;

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
            from: 'edges',
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
        yoyo: true,
    });

    gridTimeline.goTo(
        tweenGrid,
        { scale: 0.2, rotate: 90 },
        { duration: 1000 }
    );

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

        // context.fillStyle = '#fff';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;

        /**
         * Grid
         */
        data.forEach(
            (
                {
                    x,
                    y,
                    width,
                    height,
                    rotate,
                    scale,
                    offsetXCenter,
                    offsetYCenter,
                },
                index
            ) => {
                /**
                 * Around
                 */
                if (index === 40) {
                    {
                        const rotation =
                            (Math.PI / 180) * tweenAroundTarget.rotate;
                        const xx = Math.cos(rotation) * tweenAroundTarget.scale;
                        const xy = Math.sin(rotation) * tweenAroundTarget.scale;

                        /**
                         * Apply scale/rotation/scale all together.
                         */
                        context.setTransform(
                            xx,
                            xy,
                            -xy,
                            xx,
                            Math.floor(
                                tweenAroundTarget.offsetXCenter +
                                    tweenAroundTarget.x
                            ),
                            Math.floor(
                                tweenAroundTarget.offsetYCenter +
                                    tweenAroundTarget.y
                            )
                        );

                        /**
                         * Draw.
                         */
                        if (useRadius) {
                            context.beginPath();
                            context.roundRect(
                                Math.floor(-tweenAroundTarget.width / 2),
                                Math.floor(-tweenAroundTarget.height / 2),
                                Math.floor(tweenAroundTarget.width),
                                tweenAroundTarget.height,
                                5
                            );
                        } else {
                            context.beginPath();
                            context.rect(
                                Math.floor(-tweenAroundTarget.width / 2),
                                Math.floor(-tweenAroundTarget.height / 2),
                                Math.floor(tweenAroundTarget.width),
                                Math.floor(tweenAroundTarget.height)
                            );
                        }

                        context.fillStyle = '#000000';
                        context.fill();
                    }
                }

                /**
                 * GRID
                 */
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
                    Math.floor(offsetXCenter + x),
                    Math.floor(offsetYCenter + y)
                );

                /**
                 * Draw.
                 */
                if (useRadius) {
                    context.beginPath();
                    context.roundRect(
                        Math.floor(-width / 2),
                        Math.floor(-height / 2),
                        width,
                        height,
                        5
                    );
                } else {
                    context.beginPath();
                    context.rect(
                        Math.floor(-width / 2),
                        Math.floor(-height / 2),
                        width,
                        height
                    );
                }

                context.fillStyle = '#eee';
                context.fill();
            }
        );

        /**
         * CENTER TWEEN
         */
        {
            const rotation = (Math.PI / 180) * tweenRotateTarget.rotate;
            const xx = Math.cos(rotation) * tweenRotateTarget.scale;
            const xy = Math.sin(rotation) * tweenRotateTarget.scale;

            /**
             * Apply scale/rotation/scale all together.
             */
            context.setTransform(
                xx,
                xy,
                -xy,
                xx,
                Math.floor(
                    tweenRotateTarget.offsetXCenter + tweenRotateTarget.x
                ),
                Math.floor(
                    tweenRotateTarget.offsetYCenter + tweenRotateTarget.y
                )
            );

            /**
             * Draw.
             */
            if (useRadius) {
                context.beginPath();
                context.roundRect(
                    Math.floor(-tweenRotateTarget.width / 2),
                    Math.floor(-tweenRotateTarget.height / 2),
                    Math.floor(tweenRotateTarget.width),
                    Math.floor(tweenRotateTarget.height),
                    5
                );
            } else {
                context.beginPath();
                context.rect(
                    Math.floor(-tweenRotateTarget.width / 2),
                    Math.floor(-tweenRotateTarget.height / 2),
                    Math.floor(tweenRotateTarget.width),
                    Math.floor(tweenRotateTarget.height)
                );
            }

            context.fillStyle = '#a86464';
            context.fill();
        }

        /**
         * Reset all transform instead save() restore().
         */
        // context.setTransform(1, 0, 0, 1, 0, 0);

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
     * - Use debouunce for performance ( Firefix ? )
     */
    const unWatchPause = navigationStore.watch(
        'navigationIsOpen',
        MobCore.useDebounce((/** @type {any} */ val) => {
            if (val) {
                timeline.pause();
                gridTimeline.pause();
                isActive = false;
                return;
            }

            setTimeout(async () => {
                /**
                 * If close nav but change route skip.
                 */
                const currentRoute = MobJs.getActiveRoute();
                if (currentRoute.route !== activeRoute.route) return;

                timeline.resume();
                gridTimeline.resume();
                isActive = true;

                /**
                 * Restart loop
                 */
                MobCore.useFrame(() => loop());
            }, 200);
        }, 200)
    );

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
            if (!gridTimeline.isActive()) gridTimeline.play();
        },
        playReverse: () => {
            timeline.playReverse();
            if (!gridTimeline.isActive()) gridTimeline.play();
        },
        playFromLabel: () => {
            timeline
                .setTween('my-label', [tweenAround, tweenGridRotate])
                .then(() => {
                    timeline.playFrom('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                });
            if (!gridTimeline.isActive()) gridTimeline.play();
        },
        playFromLabelReverse: () => {
            timeline
                .setTween('my-label', [tweenAround, tweenGridRotate])
                .then(() => {
                    timeline.playFromReverse('my-label').then(() => {
                        console.log('resolve promise playFrom');
                    });
                });
            if (!gridTimeline.isActive()) gridTimeline.play();
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
