import { scroller, tween } from '../../../../mobMotion';

/** @type{import("../type").AboutSection1} */
export const aboutSection1 = ({ title_1, title_2 }) => {
    const title1tween = tween.createScrollerTween({
        from: { y: 0, x: 0 },
        to: { y: 30, x: 100 },
    });

    title1tween.subscribe(({ x, y }) => {
        title_1.style.transform = `translate(${x}px, ${y}px)`;
    });

    const title1parallax = scroller.createParallax({
        item: title_1,
        direction: 'horizontal',
        propierties: 'tween',
        tween: title1tween,
        align: 'center',
    });

    const title2tween = tween.createScrollerTween({
        from: { y: 0 },
        to: { y: -30 },
    });

    title2tween.subscribe(({ y }) => {
        title_2.style.transform = `translateY(${y}px)`;
    });

    const title2parallax = scroller.createParallax({
        item: title_2,
        direction: 'horizontal',
        propierties: 'tween',
        tween: title2tween,
        align: 'center',
    });

    return {
        title1parallax,
        title2parallax,
        title1tween,
        title2tween,
    };
};
