import { outerHeight } from '../../../../mobCore/utils';
import { scroller, tween } from '../../../../mobMotion';
import { SmoothScroller } from '../../../../mobMotion/plugin';
import { navigationStore } from '../store/navStore';

export const initNavigationScoller = ({ root }) => {
    const screenEl = root.querySelector('.l-navcontainer__wrap');
    const scrollerEl = root.querySelector('.l-navcontainer__scroll');
    const buttons = root.querySelectorAll('.l-navigation__item');
    const percentEl = root.querySelector('.l-navcontainer__percent');

    /**
     * Create scrollTrigger children.
     */
    const children = [...buttons].map((button) => {
        const yOffset = window.innerHeight / 4;
        const buttonTween = tween.createScrollerTween({
            from: { opacity: -0.8, y: yOffset },
            to: { opacity: 1, y: 0 },
        });

        buttonTween.subscribe(({ opacity, y }) => {
            button.style.opacity = opacity;
            button.style.transform = `translate3D(0,0,0) translateY(${y}px)`;
        });

        buttonTween.onStop(({ opacity, y }) => {
            button.style.opacity = opacity;
            button.style.transform = `translateY(${y}px)`;
        });

        return scroller.createScrollTrigger({
            item: button,
            propierties: 'tween',
            tween: buttonTween,
            start: 'bottom 0px',
            dynamicEnd: {
                position: 'bottom',
                value: () => {
                    return outerHeight(screenEl) / 2;
                },
            },
        });
    });

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
        children: [...children],
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
