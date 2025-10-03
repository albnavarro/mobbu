import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection1} */
export const aboutSection1 = ({ title_1, title_2 }) => {
    const title1tween = MobTween.createScrollerTween({
        from: { x: 0 },
        to: { x: 30 },
    });

    title1tween.subscribe(({ x }) => {
        title_1.style.transform = `translate3d(0,0,0) translate(${x}px, 0px)`;
    });

    title1tween.onStop(({ x }) => {
        title_1.style.transform = `translate(${x}px, 0px)`;
    });

    const title1parallax = MobScroll.createParallax({
        item: title_1,
        propierties: 'tween',
        tween: title1tween,
        ease: false,
        align: 'start',
    });

    const title2tween = MobTween.createScrollerTween({
        from: { x: 0 },
        to: { x: -30 },
    });

    title2tween.subscribe(({ x }) => {
        title_2.style.transform = `translate3d(0,0,0) translateX(${x}px)`;
    });

    title2tween.onStop(({ x }) => {
        title_2.style.transform = `translateX(${x}px)`;
    });

    const title2parallax = MobScroll.createParallax({
        item: title_2,
        propierties: 'tween',
        tween: title2tween,
        ease: false,
        align: 'start',
    });

    return {
        title1parallax,
        title2parallax,
        title1tween,
        title2tween,
    };
};
