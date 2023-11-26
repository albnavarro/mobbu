import { outerHeight, outerWidth } from '../../../../mobCore/utils';
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
        updateScroller: () => {
            /**
             * Get thumb width.
             */
            const scrollerHeight = outerHeight(scroller);
            const screenHeight = outerHeight(screen);
            const scrollBarHeight = outerWidth(scrollbar);
            const thumbWidth =
                (screenHeight / scrollerHeight) * scrollBarHeight;
            scrollbar.style.setProperty('--thumb-width', `${thumbWidth}px`);

            /**
             * Refresh scroller instance.
             */
            instance.refresh();
        },
        move: (val) => instance.move(val),
        goToTop: () => instance.set(0),
    };
};
