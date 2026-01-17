import { MobScroll } from '@mobMotion';
import { MobSmoothScroller } from '@mobMotionPlugin';

/** @type {import('../type').Mobbu2025Scroller} */
export const mobbu2025Scroller = ({
    screenElement,
    scrollerElement,
    layer02,
}) => {
    let parallax2 = MobScroll.createParallax({
        item: layer02,
        align: 'center',
        range: 10,
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
        children: [parallax2],
    });

    scroller.init();
    scroller.set(55);

    return {
        destroy: () => {
            scroller.destroy();
            parallax2.destroy();
            // @ts-ignore
            scroller = null;
            // @ts-ignore
            parallax2 = null;
        },
    };
};
