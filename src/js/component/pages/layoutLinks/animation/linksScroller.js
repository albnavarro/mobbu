import { MobSmoothScroller } from '../../../../mob/mobMotion/plugin';

/** @type{import("../type").LinksScroller} */
export const linksScroller = ({
    screenElement,
    scrollerElement,
    hideControls,
}) => {
    const scroller = new MobSmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'lerp',
        breakpoint: 'small',
        afterInit: ({ shouldScroll }) => {
            hideControls(shouldScroll);
        },
        afterRefresh: ({ shouldScroll }) => {
            hideControls(shouldScroll);
        },
    });

    scroller.init();

    return {
        destroy: () => {
            scroller.destroy();
        },
    };
};
