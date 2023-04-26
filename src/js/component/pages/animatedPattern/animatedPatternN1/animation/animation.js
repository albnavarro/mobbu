import { mainStore } from '../../../../../baseComponent/mainStore/mainStore';
import { core, timeline, tween } from '../../../../../mobbu';
import { clamp } from '../../../../../mobbu/animation/utils/animationUtils';
import { createGrid } from '../../../../../utils/canvasUtils';
import { navigationStore } from '../../../../layout/navigation/store/navStore';

export const animatedPatternN1Animation = ({
    canvas,
    numerOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    stroke,
}) => {
    /**
     * Mutable keyword is used for destroy reference.
     */
    let isActive = true;
    let gridData = [];
    let data = [];
    let gridTween = {};
    let centerTween = {};
    let gridTimeline = {};
    let ctx = canvas.getContext('2d', { alpha: false });
    const { activeRoute } = mainStore.get();

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    /**
     * Create basic grid.
     */
    gridData = createGrid({
        numerOfRow,
        numberOfColumn,
        cellWidth,
        cellHeight,
        gutter,
    }).items;

    /**
     * Add props to transform.
     */
    data = gridData.map((item) => {
        return { ...item, ...{ scale: 1, centerX: 0, centerY: 0 } };
    });

    /**
     * Create tween
     */
    gridTween = tween.createTween({
        ease: 'easeInOutQuad',
        stagger: {
            each: 15,
            from: { x: 5, y: 5 },
            grid: { col: 11, row: 10, direction: 'radial' },
            waitComplete: false,
        },
        data: { scale: 1 },
    });

    /**
     * Subscribe to tween
     */
    data.forEach((item) => {
        gridTween.subscribeCache(item, ({ scale, opacity }) => {
            item.scale = scale;
            item.opacity = opacity;
        });
    });

    /**
     * Create rotation tween.
     */
    centerTween = tween.createSpring({
        data: { mouseX: 0, mouseY: 0 },
    });

    /**
     * Subscribe rect to rotation tween.
     */
    data.forEach((item) => {
        centerTween.subscribeCache(item, ({ mouseX, mouseY }) => {
            item.mouseX = mouseX;
            item.mouseY = mouseY;
        });
    });

    /**
     * Main draw function.
     */
    const draw = () => {
        if (!ctx) return;

        /**
         * Get center of canvas.
         */

        /**
         * Clear rpevious render.
         */
        ctx.fillStyle = '#f6f6f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        data.forEach(
            ({ x, y, width, height, rotate, scale, mouseX, mouseY }, i) => {
                const offsetXCenter =
                    canvas.width / 2 -
                    ((width + gutter) * numberOfColumn) / 2 -
                    width / 2;

                const offsetYCenter =
                    canvas.height / 2 -
                    ((height + gutter) * (numerOfRow + 1)) / 2 -
                    height / 2;

                const centerX = x + width / 2;
                const centerY = y + height / 2;

                ctx.save();

                const mouseXparsed =
                    mouseX -
                    (canvas.width - (width + gutter) * numberOfColumn) / 2;

                const mouseYparsed =
                    mouseY -
                    (canvas.height - (height + gutter) * numerOfRow) / 2;

                const xScale = (x - mouseXparsed) / 100;
                const yScale = (y - mouseYparsed) / 100;

                ctx.translate(
                    Math.round(centerX + offsetXCenter),
                    Math.round(centerY + offsetYCenter)
                );
                ctx.scale(
                    clamp(Math.abs(xScale), 0.1, 1),
                    clamp(Math.abs(yScale), 0.1, 1)
                );

                ctx.translate(-Math.round(centerX), -Math.round(centerY));

                ctx.strokeStyle = stroke;
                ctx.lineWidth = 1;
                ctx.strokeRect(Math.round(x), Math.round(y), width, height);

                ctx.fillStyle = fill;
                ctx.fillRect(Math.round(x), Math.round(y), width, height);

                ctx.restore();
            }
        );
    };

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x, y } = client;
        const mouseX = x - canvas.width / 2;
        const mouseY = y - canvas.height / 2;
        centerTween.goTo({ mouseX: x, mouseY: y });
    });

    /**
     * Create timeline.
     */
    gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(gridTween, { scale: 0.4 }, { duration: 1000 })
        .goTo(gridTween, { scale: 1.2 }, { duration: 1000 });

    /**
     * Start timeline.
     */
    // gridTimeline.play();

    /**
     * Loop
     */
    const loop = () => {
        draw();

        if (!isActive) return;
        core.useNextFrame(() => loop());
    };

    /**
     * Start loop.
     */
    core.useFrame(({ time }) => {
        loop({ time });
    });

    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        core.useFrame(() => draw());
    });

    /**
     * Pause/Resume animation on nav open.
     */
    const unWatchPause = navigationStore.watch('openNavigation', () => {
        gridTimeline?.stop();
        isActive = false;
        canvas.classList.remove('active');
    });

    const unWatchResume = navigationStore.watch('closeNavigation', () =>
        setTimeout(async () => {
            isActive = true;

            /**
             * If close nav but change route skip.
             */
            const { activeRoute: currentRoute } = mainStore.get();
            if (currentRoute !== activeRoute) return;

            /**
             * Restart loop
             */
            gridTimeline?.play();
            core.useFrame(() => loop());
            canvas.classList.add('active');
        }, 500)
    );

    /**
     * Initial transition
     */
    canvas.classList.add('active');

    /**
     * Destroy.
     */
    return () => {
        gridTween.destroy();
        centerTween.destroy();
        gridTimeline.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        gridTween = null;
        centerTween = null;
        gridTimeline = null;
        ctx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
