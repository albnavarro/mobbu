import { SmoothScroller } from '../../../../mobbu/plugin';

export const overlayScroller = ({ screen, scroller }) => {
    const instance = new SmoothScroller({
        screen,
        scroller,
        direction: 'vertical',
        drag: true,
        scopedEvent: true,
        breackpoint: 'xSmall',
    });

    instance.init();

    return {
        updateScroller: () => instance.refresh(),
        goToTop: () => instance.set(0),
    };
};
