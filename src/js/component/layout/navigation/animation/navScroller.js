// @ts-nocheck
import { outerHeight } from '../../../../mobCore/utils';
import { SmoothScroller } from '../../../../mobMotion/plugin';
import { navigationStore } from '../store/navStore';

let currentPercent = 0;

export const initNavigationScoller = ({ root }) => {
    const screenEl = root.querySelector('.l-navcontainer__wrap');
    const scrollerEl = root.querySelector('.l-navcontainer__scroll');
    const percentEl = root.querySelector('.l-navcontainer__percent');
    const setDelay = 200;

    /**
     * Initialize Scroller.
     */
    const navScroller = new SmoothScroller({
        screen: screenEl,
        scroller: scrollerEl,
        direction: 'vertical',
        drag: true,
        scopedEvent: true,
        breakpoint: 'tablet',
        onUpdate: ({ percent }) => {
            const { navigationIsOpen } = navigationStore.get();
            if (!navigationIsOpen) return;

            currentPercent = Number.parseInt(percent) / 100;
            percentEl.style.transform = `translateZ(0) scaleX(${currentPercent})`;
        },
    });

    navScroller.init();

    /**
     * Aign menu to current active main section label
     */
    navigationStore.watch('activeSection', (section) => {
        const currentSection = document.querySelector(
            `[data-sectionname='${section}']`
        );
        if (!currentSection) return;

        const header = document.querySelector('.l-header');
        const navHeight = outerHeight(scrollerEl);
        const headerHeight = outerHeight(header);
        const percent =
            (100 * currentSection.offsetTop) /
            (navHeight - window.innerHeight + headerHeight);

        /**
         * Clap value to 100;
         */
        const maxValue = Math.min(percent, 100);
        navScroller.move(maxValue);
    });

    /**
     * Refresh scroller on navigation open.
     * Exact dimension after automac accordion close
     */
    navigationStore.watch('refreshScroller', () => navScroller.refresh());

    /**
     * Close nav.
     */
    navigationStore.watch('closeNavigation', () => {
        percentEl.style.transform = `translateZ(0) scaleX(0)`;
    });

    /**
     * Open nav.
     */
    navigationStore.watch('openNavigation', () => {
        percentEl.style.transform = `translateZ(0) scaleX(${currentPercent})`;
    });

    /**
     * Scroll to top.
     */
    navigationStore.watch('goToTop', () => {
        setTimeout(() => {
            navScroller.move(0);

            /**
             * Reset active section to scroll.
             */
            navigationStore.set('activeSection', 'no-section');
        }, setDelay);
    });
};
