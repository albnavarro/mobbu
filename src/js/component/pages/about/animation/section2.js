import { scroller, tween } from '../../../../mobMotion';

/** @type{import("../type").AboutSection2} */
export const aboutSection2 = ({ title_3, title_4 }) => {
    const section2TitleSequencer = tween.createSequencer({
        data: {
            y1: 100,
            y2: -100,
        },
    });

    section2TitleSequencer.goTo({ y1: 0, y2: 0, x2: 0 }, { start: 0, end: 6 });
    section2TitleSequencer.subscribe(({ y1, y2 }) => {
        title_3.style.transform = `translateY(${y1}%)`;
        title_4.style.transform = `translateY(${y2}%)`;
    });

    const section2TitlesScroller = scroller.createScrollTrigger({
        item: title_3,
        dynamicStart: {
            position: 'right',
            value: () => 0,
        },
        dynamicEnd: {
            position: 'left',
            value: () => 0,
        },
        ease: false,
        propierties: 'tween',
        tween: section2TitleSequencer,
    });

    return {
        section2TitlesScroller,
        section2TitleSequencer,
    };
};
