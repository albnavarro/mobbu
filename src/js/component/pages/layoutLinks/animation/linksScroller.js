import { SmoothScroller } from '../../../../mobMotion/plugin';

/** @type{import("../type").LinksScroller} */
export const linksScroller = ({ screenElement, scrollerElement }) => {
    const scroller = new SmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
    });

    scroller.init();

    return {
        destroy: () => {
            scroller.destroy();
        },
    };
};
