import { scroller, tween } from '../../../../mobMotion';

/** @type{import("../type").AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    const sectionContentSequencer = tween.createSequencer({
        data: {
            yTitle: 100,
            yCopy: -100,
            opacityTitle: 1,
            opacityCopy: 1,
        },
    });

    sectionContentSequencer
        .goTo({ yTitle: 0, yCopy: 0 }, { start: 0, end: 5 })
        .goTo({ opacityTitle: 0, opacityCopy: 0 }, { start: 7, end: 10 });

    sectionContentSequencer.subscribe(
        ({ yTitle, yCopy, opacityTitle, opacityCopy }) => {
            title.style.transform = `translateY(${yTitle}%)`;
            copy.style.transform = `translateY(${yCopy}%)`;
            title.style.opacity = opacityTitle;
            copy.style.opacity = opacityCopy;
        }
    );

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
