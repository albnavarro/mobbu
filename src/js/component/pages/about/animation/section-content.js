import { outerWidth } from '@mobCoreUtils';
import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    let sectionContentSequencer = MobTween.createSequencer({
        data: {
            xTitle: 100,
            xCopy: 100,
        },
    });

    sectionContentSequencer
        .goTo({ xCopy: 0, xTitle: 0 }, { start: 0, end: 5 })
        .goTo({ xCopy: -100, xTitle: -100 }, { start: 5, end: 10 });

    sectionContentSequencer.subscribe(({ xCopy, xTitle }) => {
        if (!copy.deref() || !title.deref()) return;

        // @ts-ignore
        copy.deref().style.transform = `translate3d(0,0,0) translateX(${xCopy}%)`;

        // @ts-ignore
        title.deref().style.transform = `translate3d(0,0,0) translateX(${xTitle}%)`;
    });

    sectionContentSequencer.onStop(({ xCopy, xTitle }) => {
        if (!copy.deref() || !title.deref()) return;

        // @ts-ignore
        copy.deref().style.transform = `translateX(${xCopy}%)`;

        // @ts-ignore
        title.deref().style.transform = `translateX(${xTitle}%)`;
    });

    let sectionContentScroller = MobScroll.createScrollTrigger({
        item: title.deref(),
        dynamicStart: {
            position: 'right',
            value: () => 0,
        },
        dynamicEnd: {
            position: 'left',
            value: () => {
                if (!title.deref()) return 0;
                // @ts-ignore
                return -outerWidth(title.deref());
            },
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
