import { outerWidth } from '@mobCoreUtils';
import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection2} */
export const sectionContentAnimation = ({ title, copy }) => {
    let sectionContentSequencer = MobTween.createSequencer({
        data: {
            x: 100,
        },
    });

    sectionContentSequencer
        .goTo({ x: 0 }, { start: 0, end: 5 })
        .goTo({ x: -100 }, { start: 5, end: 10 });

    sectionContentSequencer.subscribe(({ x }) => {
        if (!copy.deref()) return;

        // @ts-ignore
        copy.deref().style.transform = `translate3d(0,0,0) translateX(${x}%)`;
    });

    sectionContentSequencer.onStop(({ x }) => {
        if (!copy.deref()) return;

        // @ts-ignore
        copy.deref().style.transform = `translateX(${x}%)`;
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
