// @ts-check

import { outerHeight, outerWidth } from '../../../mobCore/utils';
import { SmoothScroller } from '../../../mobMotion/plugin';

/** @type{import('./type').VerticalScroller} */
export const verticalScroller = ({ screen, scroller, scrollbar }) => {
    /** @type{SmoothScroller} */
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
                    scrollbar.value = `${percent}`;
                },
            });

            instance.init();
        },
        destroy: () => {
            instance?.destroy();
            // @ts-ignore
            instance = null;
        },
        refresh: () => {
            instance?.refresh();
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

            instance.move(val);
        },
        goToTop: () => {
            instance?.set(0);
        },
        hideScrolBar: () => {
            const scrollerHeight = outerHeight(scroller);
            const screenHeight = outerHeight(screen);
            const scrollBarHeight = outerWidth(scrollbar);
            const thumbWidth =
                (screenHeight / scrollerHeight) * scrollBarHeight;

            scrollbar.classList.toggle(
                'hide-scrollbar',
                thumbWidth === scrollerHeight
            );
        },
    };
};
