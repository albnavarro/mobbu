import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    let sectionContentSequencer = MobTween.createSequencer({
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
            if (!title.deref() || !copy.deref()) return;

            // @ts-ignore
            title.deref().style.transform = `translate3d(0,0,0) translate(${xTitle}px, ${yTitle}%)`;
            // @ts-ignore
            copy.deref().style.transform = `translate3d(0,0,0) translateY(${yCopy}%)`;
            // @ts-ignore
            title.deref().style.opacity = opacityTitle;
            // @ts-ignore
            copy.deref().style.opacity = opacityCopy;
        }
    );

    sectionContentSequencer.onStop(
        ({ yTitle, xTitle, yCopy, opacityTitle, opacityCopy }) => {
            if (!title.deref() || !copy.deref()) return;

            // @ts-ignore
            title.deref().style.transform = `translate(${xTitle}px, ${yTitle}%)`;
            // @ts-ignore
            copy.deref().style.transform = `translateY(${yCopy}%)`;
            // @ts-ignore
            title.deref().style.opacity = opacityTitle;
            // @ts-ignore
            copy.deref().style.opacity = opacityCopy;
        }
    );

    let sectionContentScroller = MobScroll.createScrollTrigger({
        item: title.deref(),
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
        destroy: () => {
            sectionContentScroller.destroy();
            // @ts-ignore
            sectionContentScroller = null;
            sectionContentSequencer.destroy();
            // @ts-ignore
            sectionContentSequencer = null;
        },
    };
};
