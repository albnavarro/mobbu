import { scroller, tween } from 'path/mobbu';
import { SmoothScroller } from 'path/mobbu/plugin';
import { outerHeight } from 'path/mobbu/utils/vanillaFunction';

export const navigationScoller = () => {
    const screenEl = document.querySelector('.l-navcontainer__wrap');
    const scrollerEl = document.querySelector('.l-navcontainer__scroll');
    const buttons = document.querySelectorAll('.l-navigation__item');
    const percentEl = document.querySelector('.l-navcontainer__percent');

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
        onUpdate: ({ percent }) => {
            ...
        },
    });

    navScroller.init();
};
