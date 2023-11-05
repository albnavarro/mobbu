import { SmoothScroller } from '../../../../mobMotion/plugin';
import { navigationStore } from '../store/navStore';

export const initNavigationScoller = ({ root }) => {
    const screenEl = root.querySelector('.l-navcontainer__wrap');
    const scrollerEl = root.querySelector('.l-navcontainer__scroll');
    const percentEl = root.querySelector('.l-navcontainer__percent');

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

            percentEl.style.transform = `scaleX(${
                Number.parseInt(percent) / 100
            })`;
        },
    });

    navScroller.init();

    /**
     * Refresh scroller on navigation open.
     * Exact dimension after automac accordion close
     */
    navigationStore.watch('refreshScroller', () => navScroller.refresh());
    navigationStore.watch('closeNavigation', () => {
        percentEl.style.transform = `scaleX(0)`;
    });
    navigationStore.watch('goToTop', () => navScroller.move(0));
};
