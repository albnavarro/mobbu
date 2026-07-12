import { MobSmoothScroller } from '@mobMotionPlugin';
import { createPathAnimation } from './path-animation';
import { isRtlDirection } from '@componentLibs/utils/site-direction';

/** @type {import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
    setActiveItem,
    onMove,
    onScrollEnd,
    snapPoints,
}) => {
    /**
     * Garbage collector utils for path svg Prevent path loop inside to not collected
     */
    const weakScrollerElement = new WeakRef(scrollerElement);
    const weakPathElement = new WeakRef(pathElement);
    const weakScreenElement = new WeakRef(screenElement);

    const {
        pathScroller,
        pathSequencer,
        pathTimeline,
        pathTween,
        stopLoop,
        destroy: destroypathAnimation,
    } = createPathAnimation({
        weakPathElement,
        weakScrollerElement,
        wrapElement,
        setActiveItem,
        weakScreenElement,
        isRtl: isRtlDirection(),
    });

    let aboutScroller = new MobSmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
        useHorizontalScroll: true,
        snapPoints,
        children: isRtlDirection() ? [pathScroller] : [pathScroller],
        onUpdate: ({ value }) => {
            onMove(value);
            onScrollEnd();
        },
    });

    aboutScroller.init();

    /**
     * Refresh nav if is coming from menu. TODO: add afterNavigationClose state
     */
    setTimeout(() => {
        aboutScroller?.refresh?.();
    }, 500);

    return {
        goTo: (value) => {
            if (!value && value !== 0) return;
            void aboutScroller?.move?.(value).catch(() => {});
        },
        destroy: () => {
            aboutScroller.destroy();
            // @ts-ignore
            aboutScroller = null;
            pathSequencer.destroy();
            pathScroller.destroy();
            pathTimeline.destroy();
            pathTween.destroy();
            stopLoop();
            destroypathAnimation();
        },
    };
};
