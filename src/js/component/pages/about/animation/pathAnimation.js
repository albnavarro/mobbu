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
        data: { x: 0 },
    });

    pathSequencer.goTo({ x: 100 }, { start: 0, end: 10 });
    pathSequencer.subscribe(({ x }) => {
        pathElement.style.marginLeft = `${x}px`;
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
        invertSide: true,
    });

    return {
        pathScroller,
        pathSequencer,
    };
};
