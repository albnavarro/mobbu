import { SmoothScroller } from '../../../../mobMotion/plugin';
import { createPathAnimation } from './pathAnimation';
import { aboutSection1 } from './section1';
import { aboutSection2 } from './section2';

/** @type{import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
    title_1,
    title_2,
    title_3,
    title_4,
}) => {
    const { pathScroller, pathSequencer, pathTimeline, pathTween, stopLoop } =
        createPathAnimation({
            pathElement,
            scrollerElement,
            wrapElement,
        });

    const { title1parallax, title2parallax, title1tween, title2tween } =
        aboutSection1({ title_1, title_2 });

    const { section2TitlesScroller, section2TitleSequencer } = aboutSection2({
        title_3,
        title_4,
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
            section2TitlesScroller,
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
            section2TitlesScroller.destroy();
            section2TitleSequencer.destroy();
            stopLoop();
        },
    };
};
