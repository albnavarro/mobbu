import { SmoothScroller } from '../../../../mobMotion/plugin';

export const overlayScroller = ({ screen, scroller, scrollbar }) => {
    const instance = new SmoothScroller({
        screen,
        scroller,
        direction: 'vertical',
        drag: true,
        scopedEvent: true,
        breakpoint: 'xSmall',
        onTick: ({ percent }) => {
            scrollbar.value = percent;
        },
    });

    instance.init();

    return {
        updateScroller: () => instance.refresh(),
        move: (val) => instance.move(val),
        goToTop: () => instance.set(0),
    };
};
