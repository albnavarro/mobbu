import { SmoothScroller } from '../../../../mobMotion/plugin';
import { createPathAnimation } from './pathAnimation';
import { aboutSection1 } from './section1';
import { sectionContentAnimation } from './section2';

/** @type{import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
    title_1,
    title_2,
    section2_title,
    section2_copy,
}) => {
    const { pathScroller, pathSequencer, pathTimeline, pathTween, stopLoop } =
        createPathAnimation({
            pathElement,
            scrollerElement,
            wrapElement,
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

    const aboutScroller = new SmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
        children: [
            pathScroller,
            title1parallax,
            title2parallax,
            sectionContentScroller_1,
        ],
    });

    aboutScroller.init();

    return {
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
            stopLoop();
        },
    };
};
