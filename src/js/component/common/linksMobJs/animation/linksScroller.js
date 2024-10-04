// @ts-nocheck
// import { outerHeight, outerWidth } from '../../../../mobCore/utils';
import { SmoothScroller } from '../../../../mobMotion/plugin';

export const linksSidebarScroller = ({ screen, scroller, scrollbar }) => {
    let instance;

    return {
        init: () => {
            if (instance) return;

            instance = new SmoothScroller({
                screen,
                scroller,
                direction: 'vertical',
                drag: true,
                scopedEvent: false,
                breakpoint: 'desktop',
                onTick: ({ percent }) => {
                    scrollbar.value = percent;
                },
            });

            instance.init();
        },
        destroy: () => {
            instance?.destroy();
        },
        updateScroller: () => {
            if (!instance) return;

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
            instance?.refresh();
        },
        move: (val) => {
            if (!instance) return;
            instance?.move(val);
        },
    };
};
