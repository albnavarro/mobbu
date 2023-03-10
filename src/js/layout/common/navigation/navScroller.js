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
            from: { opacity: 0, y: yOffset },
            to: { opacity: 1, y: 0 },
        });

        buttonTween.subscribe(({ opacity, y }) => {
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
        scopedEvent: false,
        breackpoint: 'tablet',
        children: [...children],
    });

    navScroller.init();
};
