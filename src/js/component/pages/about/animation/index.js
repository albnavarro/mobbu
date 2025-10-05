import { MobSmoothScroller } from '@mobMotionPlugin';
import { createPathAnimation } from './path-animation';
import { aboutSection1 } from './section1';
import { sectionContentAnimation } from './section-content';

/** @type {import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
    title_1,
    title_2,
    section2_title,
    section3_title,
    section4_title,
    setActiveItem,
    onMove,
    onScrollEnd,
}) => {
    /**
     * Garbage collector utils for path svg Prevent path loop inside to not collected
     */
    const weakScrollerElement = new WeakRef(scrollerElement);
    const weakSectio2Title = new WeakRef(section2_title);
    const weakSectio3Title = new WeakRef(section3_title);
    const weakSectio4Title = new WeakRef(section4_title);
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
    });

    const { title1parallax, title2parallax, title1tween, title2tween } =
        aboutSection1({ title_1, title_2 });

    const {
        sectionContentScroller: sectionContentScroller_1,
        destroy: destroyContentAnimation1,
    } = sectionContentAnimation({
        title: weakSectio2Title,
    });

    const {
        sectionContentScroller: sectionContentScroller_2,
        destroy: destroyContentAnimation2,
    } = sectionContentAnimation({
        title: weakSectio3Title,
    });

    const {
        sectionContentScroller: sectionContentScroller_3,
        destroy: destroyContentAnimation3,
    } = sectionContentAnimation({
        title: weakSectio4Title,
    });

    let aboutScroller = new MobSmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'lerp',
        breakpoint: 'small',
        useHorizontalScroll: false,
        useSwipe: false,
        revertSwipeDirection: false,
        children: [
            pathScroller,
            title1parallax,
            title2parallax,
            sectionContentScroller_1,
            sectionContentScroller_2,
            sectionContentScroller_3,
        ],
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
            aboutScroller?.move?.(value).catch(() => {});
        },
        destroy: () => {
            aboutScroller.destroy();
            // @ts-ignore
            aboutScroller = null;
            pathSequencer.destroy();
            pathScroller.destroy();
            pathTimeline.destroy();
            pathTween.destroy();
            title1parallax.destroy();
            title2parallax.destroy();
            title1tween.destroy();
            title2tween.destroy();
            sectionContentScroller_1.destroy();
            sectionContentScroller_2.destroy();
            stopLoop();
            destroypathAnimation();
            destroyContentAnimation1();
            destroyContentAnimation2();
            destroyContentAnimation3();
        },
    };
};
