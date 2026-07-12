// @ts-check

import { outerHeight, outerWidth } from '@mobCoreUtils';
import { MobSmoothScroller } from '@mobMotionPlugin';

/** @type {import('./type').VerticalScroller} */
export const verticalScroller = ({
    screen,
    scroller,
    scrollbar,
    fixedTab = true,
}) => {
    /** @type {MobSmoothScroller} */
    let instance;

    return {
        init: () => {
            if (instance) return;

            instance = new MobSmoothScroller({
                screen,
                scroller,
                direction: 'vertical',
                drag: true,
                scopedEvent: true,
                breakpoint: 'tablet',
                syncTab: true,
                fixedTab,
                syncArrow: true,
                onTick: ({ percent }) => {
                    scrollbar.value = String(percent);
                },
                afterRefresh: ({ shouldScroll }) => {
                    scrollbar?.classList.toggle(
                        'hide-scrollbar',
                        !shouldScroll
                    );
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
            if (!instance || !scrollbar) return;

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
            void instance.move(val).catch(() => {});
        },
        goToTop: () => {
            instance?.set(0);
        },
    };
};
