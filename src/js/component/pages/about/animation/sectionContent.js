import { MobScroll, MobTween } from '../../../../mob/mobMotion';

/** @type{import("../type").AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    const sectionContentSequencer = MobTween.createSequencer({
        data: {
            yTitle: 100,
            xTitle: -300,
            yCopy: -100,
            opacityTitle: 1,
            opacityCopy: 1,
        },
    });

    sectionContentSequencer
        .goTo({ yTitle: 0, xTitle: 0, yCopy: 0 }, { start: 0, end: 5 })
        .goTo({ xTitle: -150 }, { start: 7, end: 10 })
        .goTo({ opacityTitle: 0, opacityCopy: 0 }, { start: 8.8, end: 10 });

    sectionContentSequencer.subscribe(
        ({ yTitle, xTitle, yCopy, opacityTitle, opacityCopy }) => {
            title.style.transform = `translate3d(0,0,0) translate(${xTitle}px, ${yTitle}%)`;
            copy.style.transform = `translate3d(0,0,0) translateY(${yCopy}%)`;
            title.style.opacity = opacityTitle;
            copy.style.opacity = opacityCopy;
        }
    );

    sectionContentSequencer.onStop(
        ({ yTitle, xTitle, yCopy, opacityTitle, opacityCopy }) => {
            title.style.transform = `translate(${xTitle}px, ${yTitle}%)`;
            copy.style.transform = `translateY(${yCopy}%)`;
            title.style.opacity = opacityTitle;
            copy.style.opacity = opacityCopy;
        }
    );

    const sectionContentScroller = MobScroll.createScrollTrigger({
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
