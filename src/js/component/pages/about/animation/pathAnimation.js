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
}) => {
    /**
     * Data
     */
    const sequencerData = {
        ax: 5,
        ay: 12,
        bx: 42,
        by: 40,
        cx: 94,
        cy: 52,
        dx: 19,
        dy: 85,
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
    };

    /**
     * Sequencer
     * Scroll shape mutation
     */
    const pathSequencer = tween.createSequencer({
        data: { ...sequencerData },
    });

    pathSequencer.goTo(
        { ax: 5, ay: 73, dx: 51, dy: 60 },
        { start: 0, end: 3.5 }
    );
    pathSequencer.goTo({ bx: 68, by: 6, cx: 95, cy: 90 }, { start: 1, end: 3 });
    pathSequencer.goTo(
        { bx: 95, by: 10, dx: 30, dy: 90 },
        { start: 4.5, end: 5.5 }
    );
    pathSequencer.goTo(
        { ax: 8, ay: 25, cx: 45, cy: 55 },
        { start: 3.5, end: 6.5 }
    );
    pathSequencer.goTo(
        { ax: 38, ay: 45, cx: 95, cy: 42 },
        { start: 7, end: 8 }
    );
    pathSequencer.goTo(
        { bx: 53, by: 13, dx: 5, dy: 80 },
        { start: 6.5, end: 10 }
    );
    pathSequencer.subscribe(({ ax, ay, bx, by, cx, cy, dx, dy }) => {
        sequencerData.ax = ax;
        sequencerData.ay = ay;
        sequencerData.bx = bx;
        sequencerData.by = by;
        sequencerData.cx = cx;
        sequencerData.cy = cy;
        sequencerData.dx = dx;
        sequencerData.dy = dy;
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
                ax: () => randomIntFromInterval(-5, 5),
                ay: () => randomIntFromInterval(-5, 5),
                bx: () => randomIntFromInterval(-5, 5),
                by: () => randomIntFromInterval(-5, 5),
                cx: () => randomIntFromInterval(-5, 5),
                cy: () => randomIntFromInterval(-5, 5),
                dx: () => randomIntFromInterval(-5, 5),
                dy: () => randomIntFromInterval(-5, 5),
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

        pathElement.style.clipPath = `polygon(${a.x}% ${a.y}%, ${b.x}% ${b.y}%, ${c.x}% ${c.y}%, ${d.x}% ${d.y}%)`;
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
