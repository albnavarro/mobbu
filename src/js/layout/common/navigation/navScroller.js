import { scroller, tween } from '../../../mobbu';
import { SmoothScroller } from '../../../mobbu/plugin';
import { outerHeight } from '../../../mobbu/utils/vanillaFunction';
import { navigationStore } from './navStore';

export const navigationScoller = () => {
    const screenEl = document.querySelector('.l-navcontainer__wrap');
    const scrollerEl = document.querySelector('.l-navcontainer__scroll');
    const buttons = document.querySelectorAll('.l-navigation__item');

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
     * Inizialize Scroller.
     */
    const navScroller = new SmoothScroller({
        screen: screenEl,
        scroller: scrollerEl,
        direction: 'vertical',
        drag: true,
        scopedEvent: true,
        breackpoint: 'tablet',
        children: [...children],
    });

    navScroller.init();

    /**
     * Refresh scroller on navigation open.
     * Exact dimension after automac accordion close
     */
    navigationStore.watch('refreshScroller', () => navScroller.refresh());
};
