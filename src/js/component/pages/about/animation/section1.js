import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').AboutSection1} */
export const aboutSection1 = ({ title_1, title_2 }) => {
    const title1tween = MobTween.createScrollerTween({
        from: { y: 0 },
        to: { y: 30 },
    });

    title1tween.subscribe(({ y }) => {
        title_1.style.transform = `translate3d(0,0,0) translate(${0}px, ${y}px)`;
    });

    title1tween.onStop(({ y }) => {
        title_1.style.transform = `translate(${0}px, ${y}px)`;
    });

    const title1parallax = MobScroll.createParallax({
        item: title_1,
        propierties: 'tween',
        tween: title1tween,
        ease: false,
        align: 'start',
    });

    const title2tween = MobTween.createScrollerTween({
        from: { y: 0 },
        to: { y: -30 },
    });

    title2tween.subscribe(({ y }) => {
        title_2.style.transform = `translate3d(0,0,0) translateY(${y}px)`;
    });

    title2tween.onStop(({ y }) => {
        title_2.style.transform = `translateY(${y}px)`;
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
