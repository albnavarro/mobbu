// https://bennettfeely.com/clippy/

import { MobCore } from '@mobCore';
import { outerWidth } from '@mobCoreUtils';
import { MobScroll, MobTimeline, MobTween } from '@mobMotion';
import { randomIntFromInterval } from '@utils/utils';

/** @type {import('../type').CreatePathAnimation} */
export const createPathAnimation = ({
    weakPathElement,
    weakScrollerElement,
    wrapElement,
    setActiveItem,
}) => {
    /**
     * Data
     */
    const sequencerData = {
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
     * Sequencer Scroll shape mutation
     */
    let pathSequencer = MobTween.createSequencer({
        data: { ...sequencerData },
        stagger: {
            each: 40,
            waitComplete: false,
            from: 'end',
        },
    });

    /**
     * The senquencer is inverted. start from 10.
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
        // forward
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(2);
        }, 0.5)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(3);
        }, 6)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'backward') return;
            setActiveItem(4);
        }, 9.5)
        // backward
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(1);
        }, 0.5)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(2);
        }, 5)
        .add(({ direction, isForced }) => {
            if (isForced || direction === 'forward') return;
            setActiveItem(3);
        }, 9);

    pathSequencer.subscribe(
        ({ ax, ay, bx, by, cx, cy, dx, dy, ex, ey, fx, fy, gx, gy }) => {
            sequencerData.ax = ax;
            sequencerData.ay = ay;
            sequencerData.bx = bx;
            sequencerData.by = by;
            sequencerData.cx = cx;
            sequencerData.cy = cy;
            sequencerData.dx = dx;
            sequencerData.dy = dy;
            sequencerData.ex = ex;
            sequencerData.ey = ey;
            sequencerData.fx = fx;
            sequencerData.fy = fy;
            sequencerData.gx = gx;
            sequencerData.gy = gy;
        }
    );

    /**
     * Tween Perpetual movement
     */
    let pathTween = MobTween.createTimeTween({
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
     * Timeline Loop pathTween
     */
    let pathTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        autoSet: false,
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
     * Main loop Apply Perpetual + scroll value
     */
    let shouldLoop = true;
    const loop = () => {
        if (!shouldLoop) return;

        const a = {
            x: sequencerData.ax + timelineData.ax,
            y: sequencerData.ay + timelineData.ay,
        };

        const b = {
            x: sequencerData.bx + timelineData.bx,
            y: sequencerData.by + timelineData.by,
        };

        const c = {
            x: sequencerData.cx + timelineData.cx,
            y: sequencerData.cy + timelineData.cy,
        };

        const d = {
            x: sequencerData.dx + timelineData.dx,
            y: sequencerData.dy + timelineData.dy,
        };

        const e = {
            x: sequencerData.ex + timelineData.ex,
            y: sequencerData.ey + timelineData.ey,
        };

        const f = {
            x: sequencerData.fx + timelineData.fx,
            y: sequencerData.fy + timelineData.fy,
        };

        const g = {
            x: sequencerData.gx + timelineData.gx,
            y: sequencerData.gy + timelineData.gy,
        };

        if (!weakPathElement.deref()) return;
        weakPathElement.deref().style.clipPath = `polygon(${a.x}% ${a.y}%, ${b.x}% ${b.y}%, ${c.x}% ${c.y}%, ${d.x}% ${d.y}%,${e.x}% ${e.y}%,${f.x}% ${f.y}%,${g.x}% ${g.y}%)`;

        MobCore.useNextFrame(() => loop());
    };

    MobCore.useFrame(() => loop());

    /**
     * ScrollTrigger
     */
    let pathScroller = MobScroll.createScrollTrigger({
        item: wrapElement,
        dynamicStart: {
            position: 'left',
            value: () => window.innerWidth,
        },
        dynamicEnd: {
            position: 'right',
            value: () => {
                return (
                    -outerWidth(
                        weakScrollerElement?.deref() ??
                            document.createElement('div')
                    ) + window.innerWidth
                );
            },
        },
        reverse: true,
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
        destroy: () => {
            pathScroller.destroy();
            // @ts-ignore
            pathScroller = null;
            pathSequencer.destroy();
            // @ts-ignore
            pathSequencer = null;
            pathTween.destroy();
            // @ts-ignore
            pathTween = null;
            pathTimeline.destroy();
            // @ts-ignore
            pathTimeline = null;
        },
    };
};
