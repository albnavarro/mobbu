import { MobSmoothScroller } from '@mobMotionPlugin';
import { inspirationAnimation } from './inspiration';
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
    section2_copy,
    section3_title,
    section3_copy,
    inspirationItem,
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
    const weakSectio2Copy = new WeakRef(section2_copy);
    const weakSectio3Title = new WeakRef(section3_title);
    const weakSectio3Copy = new WeakRef(section3_copy);
    const weakSectio4Title = new WeakRef(section4_title);
    const weakPathElement = new WeakRef(pathElement);
    const weakInspirationitem = inspirationItem.map((element) => {
        return new WeakRef(element);
    });

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
    });

    const { title1parallax, title2parallax, title1tween, title2tween } =
        aboutSection1({ title_1, title_2 });

    const {
        sectionContentScroller: sectionContentScroller_1,
        sectionContentSequencer: section2TitleSequencer_1,
    } = sectionContentAnimation({
        title: weakSectio2Title,
        copy: weakSectio2Copy,
    });

    const {
        sectionContentScroller: sectionContentScroller_2,
        sectionContentSequencer: section2TitleSequencer_2,
        destroy: destroyContentAnimation,
    } = sectionContentAnimation({
        title: weakSectio3Title,
        copy: weakSectio3Copy,
    });

    const {
        inspirationScroller,
        masterSequencer,
        titleSequencer,
        destroy: destroyInspirationAnimation,
    } = inspirationAnimation({
        weakInspirationitem,
        weakSectio4Title,
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
            inspirationScroller,
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
            section2TitleSequencer_1.destroy();
            sectionContentScroller_2.destroy();
            section2TitleSequencer_2.destroy();
            inspirationScroller.destroy();
            masterSequencer.destroy();
            titleSequencer.destroy();
            stopLoop();
            destroypathAnimation();
            destroyContentAnimation();
            destroyInspirationAnimation();
        },
    };
};
