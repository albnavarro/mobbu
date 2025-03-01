// https://bennettfeely.com/clippy/

import { mobCore } from '../../../../mobCore';
import { outerWidth } from '../../../../mobCore/utils';
import { scroller, timeline, tween } from '../../../../mobMotion';
import { randomIntFromInterval } from '../../../../utils/utils';

/** @type{import('../type').CreatePathAnimation} */
export const createPathAnimation = ({
    pathElement,
    scrollerElement,
    wrapElement,
    setActiveItem,
}) => {
    /**
     * Data
     */
    const sequencerData = pathElement.map(() => {
        return {
            ax: 5,
            ay: 12,
            bx: 42,
            by: 40,
            cx: 94,
            cy: 52,
            dx: 19,
            dy: 85,
        };
    });

    const timelineData = {
        ax: -1,
        ay: -1,
        bx: 1,
        by: 1,
        cx: -1,
        cy: -1,
        dx: 1,
        dy: 1,
    };

    /**
     * Sequencer
     * Scroll shape mutation
     */
    const pathSequencer = tween.createSequencer({
        data: { ...sequencerData[0] },
        stagger: {
            each: 10,
            waitComplete: false,
            from: 'end',
        },
    });

    /**
     * The senquencer is inverted.
     * start from 10.
     * Use `fromTo` in scrolltrigger to reverse direction.
     * Purtroppo l'ho pensato al contrario, pace.
     */
    pathSequencer
        .goTo({ ax: 10, ay: 43, dx: 51, dy: 50 }, { start: 0, end: 3.5 })
        .goTo({ bx: 68, by: 6, cx: 85, cy: 80 }, { start: 1, end: 3 })
        .goTo({ bx: 85, by: 10, dx: 30, dy: 90 }, { start: 4.5, end: 5.5 })
        .goTo({ ax: 8, ay: 25, cx: 45, cy: 55 }, { start: 3.5, end: 6.5 })
        .goTo({ ax: 38, ay: 45, cx: 85, cy: 42 }, { start: 8, end: 9 })
        .goTo({ bx: 53, by: 13, dx: 5, dy: 80 }, { start: 7.5, end: 10 })
        .add(() => {
            setActiveItem(1);
        }, 10)
        .add(({ direction, isForced }) => {
            if (isForced) return;
            setActiveItem(direction === 'backward' ? 2 : 1);
        }, 8.5)
        .add(({ direction, isForced }) => {
            if (isForced) return;
            setActiveItem(direction === 'backward' ? 3 : 2);
        }, 4.5)
        .add(({ direction, isForced }) => {
            if (isForced) return;
            setActiveItem(direction === 'backward' ? 4 : 3);
        }, 1);

    sequencerData.forEach((item) => {
        pathSequencer.subscribe(({ ax, ay, bx, by, cx, cy, dx, dy }) => {
            item.ax = ax;
            item.ay = ay;
            item.bx = bx;
            item.by = by;
            item.cx = cx;
            item.cy = cy;
            item.dx = dx;
            item.dy = dy;
        });
    });

    /**
     * Tween
     * Perpetual movement
     */
    const pathTween = tween.createTween({
        data: { ...timelineData },
    });

    pathTween.subscribe(({ ax, ay, bx, by, cx, cy, dx, dy }) => {
        timelineData.ax = ax;
        timelineData.ay = ay;
        timelineData.bx = bx;
        timelineData.by = by;
        timelineData.cx = cx;
        timelineData.cy = cy;
        timelineData.dx = dx;
        timelineData.dy = dy;
    });

    /**
     * Timeline
     * Loop pathTween
     */
    const pathTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(
            pathTween,
            {
                ax: () => randomIntFromInterval(-7, 7),
                ay: () => randomIntFromInterval(-7, 7),
                bx: () => randomIntFromInterval(-7, 7),
                by: () => randomIntFromInterval(-7, 7),
                cx: () => randomIntFromInterval(-7, 7),
                cy: () => randomIntFromInterval(-7, 7),
                dx: () => randomIntFromInterval(-7, 7),
                dy: () => randomIntFromInterval(-7, 7),
            },
            { duration: 3000 }
        );

    pathTimeline.play();

    /**
     * Main loop
     * Apply Perpetual + scroll value
     */
    let shouldLoop = true;
    const loop = () => {
        if (!shouldLoop) return;

        sequencerData.forEach((item, index) => {
            const currentPath = pathElement[index];

            const a = {
                x: item.ax + timelineData.ax,
                y: item.ay + timelineData.ay,
            };

            const b = {
                x: item.bx + timelineData.bx,
                y: item.by + timelineData.by,
            };

            const c = {
                x: item.cx + timelineData.cx,
                y: item.cy + timelineData.cy,
            };

            const d = {
                x: item.dx + timelineData.dx,
                y: item.dy + timelineData.dy,
            };

            currentPath.style.clipPath = `polygon(${a.x}% ${a.y}%, ${b.x}% ${b.y}%, ${c.x}% ${c.y}%, ${d.x}% ${d.y}%)`;
        });

        mobCore.useNextFrame(() => loop());
    };

    mobCore.useFrame(() => loop());

    /**
     * ScrollTrigger
     */
    const pathScroller = scroller.createScrollTrigger({
        item: wrapElement,
        dynamicStart: {
            position: 'left',
            value: () => window.innerWidth,
        },
        dynamicEnd: {
            position: 'right',
            value: () => {
                return -outerWidth(scrollerElement) + window.innerWidth;
            },
        },
        propierties: 'tween',
        ease: false,
        tween: pathSequencer,
    });

    return {
        pathScroller,
        pathSequencer,
        pathTween,
        pathTimeline,
        stopLoop: () => {
            shouldLoop = false;
        },
    };
};
