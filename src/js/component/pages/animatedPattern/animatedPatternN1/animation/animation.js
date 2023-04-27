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
    let centerTween = {};

    let gridTween = {};
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
        return { ...item, ...{ scale: 1, mouseX: 0, mouseY: 0 } };
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
     * Create tween
     */
    gridTween = tween.createTween({
        ease: 'easeInOutSine',
        stagger: {
            each: 5,
            from: 'start',
            grid: { col: 15, row: 10, direction: 'row' },
            waitComplete: false,
        },
        data: { scale: 0 },
    });

    /**
     * Subscribe to tween
     */
    data.forEach((item) => {
        gridTween.subscribeCache(item, ({ scale }) => {
            item.scale = scale;
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

        data.forEach(({ x, y, width, height, mouseX, mouseY, scale }) => {
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
                mouseX - (canvas.width - (width + gutter) * numberOfColumn) / 2;

            const mouseYparsed =
                mouseY - (canvas.height - (height + gutter) * numerOfRow) / 2;

            const xScale = (x - mouseXparsed) / 350;
            const yScale = (y - mouseYparsed) / 350;

            const delta = Math.sqrt(
                Math.pow(Math.abs(xScale), 2) + Math.pow(Math.abs(yScale), 2)
            );

            ctx.translate(
                Math.round(centerX + offsetXCenter),
                Math.round(centerY + offsetYCenter)
            );

            const scaleFactor = clamp(Math.abs(delta), 0.1, 1);

            ctx.scale(scaleFactor + scale, scaleFactor + scale);

            ctx.translate(-Math.round(centerX), -Math.round(centerY));

            ctx.strokeStyle = stroke;
            ctx.lineWidth = 1;
            ctx.strokeRect(Math.round(x), Math.round(y), width, height);

            ctx.fillStyle = fill;
            ctx.fillRect(Math.round(x), Math.round(y), width, height);

            ctx.restore();
        });
    };

    /**
     * Create timeline.
     */
    gridTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(gridTween, { scale: 0.2 }, { duration: 500 });

    /**
     * Start timeline.
     */
    gridTimeline.play();

    const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
        const { x, y } = client;
        centerTween.goTo({ mouseX: x, mouseY: y });
    });

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
        gridTimeline.destroy();
        centerTween.destroy();
        unsubscribeResize();
        unsubscribeMouseMove();
        unWatchResume();
        unWatchPause();
        gridTween = null;
        gridTimeline = null;
        centerTween = null;
        ctx = null;
        gridData = [];
        data = [];
        isActive = false;
    };
};
