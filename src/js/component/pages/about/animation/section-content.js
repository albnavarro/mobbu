import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection2} */
export const sectionContentAnimation = ({ title }) => {
    const tween = MobTween.createScrollerTween({
        from: { x: 0 },
        to: { x: -60 },
    });

    tween.subscribe(({ x }) => {
        if (!title.deref()) return;

        // @ts-ignore
        title.deref().style.transform = `translate3d(0,0,0) translateX(${x}px)`;
    });

    tween.onStop(({ x }) => {
        if (!title.deref()) return;

        // @ts-ignore
        title.deref().style.transform = `translateX(${x}px)`;
    });

    let sectionContentScroller = MobScroll.createParallax({
        item: title.deref(),
        propierties: 'tween',
        tween: tween,
        ease: false,
        align: 'center',
    });

    return {
        sectionContentScroller,
        destroy: () => {
            sectionContentScroller.destroy();
            // @ts-ignore
            sectionContentScroller = null;
        },
    };
};
