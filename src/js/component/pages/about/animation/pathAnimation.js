// https://bennettfeely.com/clippy/

import { outerWidth } from '../../../../mobCore/utils';
import { scroller, tween } from '../../../../mobMotion';

/** @type{import('../type').CreatePathAnimation} */
export const createPathAnimation = ({
    pathElement,
    scrollerElement,
    wrapElement,
}) => {
    const pathSequencer = tween.createSequencer({
        data: {
            ax: 5,
            ay: 12,
            bx: 42,
            by: 40,
            cx: 94,
            cy: 52,
            dx: 19,
            dy: 85,
        },
    });

    pathSequencer.goTo(
        { ax: 5, ay: 73, bx: 68, by: 6, cx: 95, cy: 90, dx: 51, dy: 60 },
        { start: 0, end: 3.5 }
    );
    pathSequencer.goTo(
        { ax: 8, ay: 25, bx: 95, by: 10, cx: 45, cy: 55, dx: 30, dy: 90 },
        { start: 3.5, end: 6.5 }
    );
    pathSequencer.goTo(
        { ax: 38, ay: 45, bx: 53, by: 13, cx: 95, cy: 42, dx: 5, dy: 80 },
        { start: 6.5, end: 10 }
    );
    pathSequencer.subscribe(({ ax, ay, bx, by, cx, cy, dx, dy }) => {
        pathElement.style.clipPath = `polygon(${ax}% ${ay}%, ${bx}% ${by}%, ${cx}% ${cy}%, ${dx}% ${dy}%)`;
    });

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
    };
};
