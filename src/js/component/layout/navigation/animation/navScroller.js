// @ts-nocheck
import { outerHeight } from '../../../../mobCore/utils';
import { SmoothScroller } from '../../../../mobMotion/plugin';
import { navigationStore } from '../store/navStore';

let currentPercent = 0;

/**
 * @param {object} params
 * @param {HTMLElement} params.root
 * @returns {{scrollNativationToTop: () => void, refreshScroller: () => void}}
 */
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
        scopedEvent: false,
        breakpoint: 'small',
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
    navigationStore.watch('activeNavigationSection', (section) => {
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

        const maxValue = percent;

        navScroller.move(maxValue);
    });

    /**
     * Open/close nav.
     */
    navigationStore.watch('navigationIsOpen', (val) => {
        if (val) {
            percentEl.style.transform = `translateZ(0) scaleX(${currentPercent})`;
            return;
        }

        percentEl.style.transform = `translateZ(0) scaleX(0)`;
    });

    return {
        scrollNativationToTop: () => {
            setTimeout(() => {
                navScroller.move(0);

                /**
                 * Reset active section to scroll.
                 */
                navigationStore.set('activeNavigationSection', 'no-section');
            }, setDelay);
        },
        refreshScroller: () => {
            navScroller.refresh();
        },
    };
};
