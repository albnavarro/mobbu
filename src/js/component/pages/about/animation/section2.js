import { scroller, tween } from '../../../../mobMotion';

/** @type{import("../type").AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    const sectionContentSequencer = tween.createSequencer({
        data: {
            yTitle: 100,
            yCopy: -100,
        },
    });

    sectionContentSequencer.goTo({ yTitle: 0, yCopy: 0 }, { start: 0, end: 5 });
    sectionContentSequencer.subscribe(({ yTitle, yCopy }) => {
        title.style.transform = `translateY(${yTitle}%)`;
        copy.style.transform = `translateY(${yCopy}%)`;
    });

    const sectionContentScroller = scroller.createScrollTrigger({
        item: title,
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
        tween: sectionContentSequencer,
    });

    return {
        sectionContentScroller,
        sectionContentSequencer,
    };
};
