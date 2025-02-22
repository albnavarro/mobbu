import { SmoothScroller } from '../../../../mobMotion/plugin';
import { createPathAnimation } from './pathAnimation';

/** @type{import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
}) => {
    const { pathScroller, pathSequencer, pathTimeline, pathTween, stopLoop } =
        createPathAnimation({
            pathElement,
            scrollerElement,
            wrapElement,
        });

    const aboutScroller = new SmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
        children: [pathScroller],
    });

    aboutScroller.init();

    return {
        destroy: () => {
            aboutScroller.destroy();
            pathSequencer.destroy();
            pathScroller.destroy();
            pathTimeline.destroy();
            pathTween.destroy();
            stopLoop();
        },
    };
};
