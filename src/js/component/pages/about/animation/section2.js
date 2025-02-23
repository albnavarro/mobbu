import { scroller, tween } from '../../../../mobMotion';

/** @type{import("../type").AboutSection2} */
export const aboutSection2 = ({ section2_title, section2_copy }) => {
    const section2TitleSequencer = tween.createSequencer({
        data: {
            yTitle: 100,
            yCopy: -100,
        },
    });

    section2TitleSequencer.goTo({ yTitle: 0, yCopy: 0 }, { start: 0, end: 5 });
    section2TitleSequencer.subscribe(({ yTitle, yCopy }) => {
        section2_title.style.transform = `translateY(${yTitle}%)`;
        section2_copy.style.transform = `translateY(${yCopy}%)`;
    });

    const section2TitlesScroller = scroller.createScrollTrigger({
        item: section2_title,
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
