// https://bennettfeely.com/clippy/

import { MobCore } from '@mobCore';
import { outerWidth } from '@mobCoreUtils';
import { MobScroll, MobTimeline, MobTween } from '@mobMotion';
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
            ax: 53,
            ay: 70,
            bx: 64,
            by: 80,
            cx: 89,
            cy: 87,
            dx: 100,
            dy: 100,
            ex: 0,
            ey: 100,
            fx: 10,
            fy: 77,
            gx: 17,
            gy: 84,
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
        ex: 1,
        ey: 1,
        fx: -1,
        fy: -1,
        gx: 1,
        gy: 1,
    };

    /**
     * Sequencer
     * Scroll shape mutation
     */
    const pathSequencer = MobTween.createSequencer({
        data: { ...sequencerData[0] },
        stagger: {
            each: 40,
            waitComplete: false,
            from: 'end',
        },
    });

    /**
     * The senquencer is inverted.
     * start from 10.
     */
    pathSequencer
        .goTo(
            {
                fy: 90,
                ay: 90,
                cy: 70,
            },
            { start: 0, end: 3.5 }
        )
        .goTo(
            {
                gy: 70,
                by: 80,
            },
            { start: 2, end: 5 }
        )
        .goTo(
            {
                fy: 90,
                ay: 100,
                cy: 90,
            },
            { start: 4, end: 7.5 }
        )
        .goTo(
            {
                ay: 120,
                fy: 80,
                cy: 80,
            },
            { start: 7.5, end: 10 }
        )
        .goTo(
            {
                gy: 100,
                by: 100,
            },
            { start: 6, end: 10 }
        )

        /*
         * Snap to the nearest section based on scroll direction
         */
        .add(() => {
            setActiveItem(1);
        }, 0)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(1);
        }, 2.5)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(2);
        }, 1)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(2);
        }, 6)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(3);
        }, 4.5)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(3);
        }, 9)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(4);
        }, 8);

    sequencerData.forEach((item) => {
        pathSequencer.subscribe(
            ({ ax, ay, bx, by, cx, cy, dx, dy, ex, ey, fx, fy, gx, gy }) => {
                item.ax = ax;
                item.ay = ay;
                item.bx = bx;
                item.by = by;
                item.cx = cx;
                item.cy = cy;
                item.dx = dx;
                item.dy = dy;
                item.ex = ex;
                item.ey = ey;
                item.fx = fx;
                item.fy = fy;
                item.gx = gx;
                item.gy = gy;
            }
        );
    });

    /**
     * Tween
     * Perpetual movement
     */
    const pathTween = MobTween.createTimeTween({
        data: { ...timelineData },
    });

    pathTween.subscribe(
        ({ ax, ay, bx, by, cx, cy, dx, dy, ex, ey, fx, fy, gx, gy }) => {
            timelineData.ax = ax;
            timelineData.ay = ay;
            timelineData.bx = bx;
            timelineData.by = by;
            timelineData.cx = cx;
            timelineData.cy = cy;
            timelineData.dx = dx;
            timelineData.dy = dy;
            timelineData.ex = ex;
            timelineData.ey = ey;
            timelineData.fx = fx;
            timelineData.fy = fy;
            timelineData.gx = gx;
            timelineData.gy = gy;
        }
    );

    /**
     * Timeline
     * Loop pathTween
     */
    const pathTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
    }).goTo(
        pathTween,
        {
            ax: () => randomIntFromInterval(-3, 3),
            ay: () => randomIntFromInterval(-3, 3),
            bx: () => randomIntFromInterval(-3, 3),
            by: () => randomIntFromInterval(-3, 3),
            cx: () => randomIntFromInterval(-3, 3),
            cy: () => randomIntFromInterval(-3, 3),
            dx: () => 0,
            dy: () => 0,
            ex: () => 0,
            ey: () => 0,
            fx: () => randomIntFromInterval(-3, 3),
            fy: () => randomIntFromInterval(-3, 3),
            gx: () => randomIntFromInterval(-3, 3),
            gy: () => randomIntFromInterval(-3, 3),
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

            const e = {
                x: item.ex + timelineData.ex,
                y: item.ey + timelineData.ey,
            };

            const f = {
                x: item.fx + timelineData.fx,
                y: item.fy + timelineData.fy,
            };

            const g = {
                x: item.gx + timelineData.gx,
                y: item.gy + timelineData.gy,
            };

            currentPath.style.clipPath = `polygon(${a.x}% ${a.y}%, ${b.x}% ${b.y}%, ${c.x}% ${c.y}%, ${d.x}% ${d.y}%,${e.x}% ${e.y}%,${f.x}% ${f.y}%,${g.x}% ${g.y}%)`;
        });

        MobCore.useNextFrame(() => loop());
    };

    MobCore.useFrame(() => loop());

    /**
     * ScrollTrigger
     */
    const pathScroller = MobScroll.createScrollTrigger({
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
        fromTo: true,
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
