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
    onScrollEnd,
    onMove,
    onSwipe,
}) => {
    const { pathScroller, pathSequencer, pathTimeline, pathTween, stopLoop } =
        createPathAnimation({
            pathElement,
            scrollerElement,
            wrapElement,
            setActiveItem,
        });

    const { title1parallax, title2parallax, title1tween, title2tween } =
        aboutSection1({ title_1, title_2 });

    const {
        sectionContentScroller: sectionContentScroller_1,
        sectionContentSequencer: section2TitleSequencer_1,
    } = sectionContentAnimation({
        title: section2_title,
        copy: section2_copy,
    });

    const {
        sectionContentScroller: sectionContentScroller_2,
        sectionContentSequencer: section2TitleSequencer_2,
    } = sectionContentAnimation({
        title: section3_title,
        copy: section3_copy,
    });

    const { inspirationScroller, masterSequencer, titleSequencer } =
        inspirationAnimation({
            inspirationItem,
            section4_title,
        });

    const aboutScroller = new MobSmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
        useHorizontalScroll: false,
        useSwipe: true,
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
        onSwipe: ({ direction }) => {
            onSwipe(direction);
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
            aboutScroller.move(value).catch(() => {});
        },
        destroy: () => {
            aboutScroller.destroy();
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
        },
    };
};
