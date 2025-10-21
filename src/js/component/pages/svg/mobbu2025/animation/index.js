import { MobScroll } from '@mobMotion';
import { MobSmoothScroller } from '@mobMotionPlugin';

/** @type {import('../type').Mobbu2025Scroller} */
export const mobbu2025Scroller = ({
    screenElement,
    scrollerElement,
    layer01,
    layer02,
    layer04,
}) => {
    let parallax1 = MobScroll.createParallax({
        item: layer01,
        align: 'center',
        range: 3,
        propierties: 'x',
        ease: false,
    });

    let parallax2 = MobScroll.createParallax({
        item: layer02,
        align: 'center',
        range: 5,
        propierties: 'x',
        ease: false,
    });

    let parallax4 = MobScroll.createParallax({
        item: layer04,
        align: 'center',
        range: 7,
        propierties: 'x',
        ease: false,
    });

    let scroller = new MobSmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        useHorizontalScroll: true,
        easeType: 'lerp',
        breakpoint: 'small',
        children: [parallax1, parallax2, parallax4],
    });

    scroller.init();
    scroller.move(55);

    return {
        destroy: () => {
            scroller.destroy();
            parallax1.destroy();
            parallax2.destroy();
            parallax4.destroy();
            // @ts-ignore
            scroller = null;
            // @ts-ignore
            parallax1 = null;
            // @ts-ignore
            parallax2 = null;
            // @ts-ignore
            parallax4 = null;
        },
    };
};
