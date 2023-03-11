import { navigationStore } from '.';
import { scroller, tween } from '../../../mobbu';
import { SmoothScroller } from '../../../mobbu/plugin';
import { outerHeight } from '../../../mobbu/utils/vanillaFunction';

export const navScroller = () => {
    const screenEl = document.querySelector('.l-navcontainer__wrap');
    const scrollerEl = document.querySelector('.l-navcontainer__scroll');
    const buttons = document.querySelectorAll('.l-navigation__item');

    const children = [...buttons].map((button) => {
        const yOffset = window.innerHeight / 7;
        const buttonTween = tween.createScrollerTween({
            from: { opacity: 0, y: yOffset, scale: 0.8 },
            to: { opacity: 1, y: 0, scale: 1 },
        });

        buttonTween.subscribe(({ opacity, y, scale }) => {
            button.style.opacity = opacity;
            button.style.transform = `translate3D(0,0,0) translateY(${y}px) scale(${scale})`;
        });

        buttonTween.onStop(({ opacity, y, scale }) => {
            button.style.opacity = opacity;
            button.style.transform = `translateY(${y}px) scale(${scale})`;
        });

        return scroller.createScrollTrigger({
            item: button,
            propierties: 'tween',
            tween: buttonTween,
            start: 'bottom 0px',
            dynamicEnd: {
                position: 'bottom',
                value: () => {
                    return outerHeight(screenEl) / 3;
                },
            },
        });
    });

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
