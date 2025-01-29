//@ts-check

import { timeline, tween } from '../../../mobMotion';

/** @type {import('./type').SimpleIntroAnimation} */
export const simpleIntroAnimation = ({ refs }) => {
    let introTween = tween.createTween({
        data: { opacity: 0, scale: 0.5 },
        duration: 2000,
        ease: 'easeOutQuart',
        stagger: { each: 8, from: 'end' },
    });

    let loopTween = tween.createTween({
        data: { scale: 1 },
        duration: 6000,
        ease: 'easeInOutQuad',
        stagger: { each: 12, from: 'end' },
    });

    refs.forEach((item) => {
        introTween.subscribeCache(item, ({ scale, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = `${opacity}`;
        });

        loopTween.subscribe(({ scale }) => {
            item.style.scale = `${scale}`;
        });
    });

    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).goTo(introTween, {
        opacity: 1,
        scale: 1,
    });

    let loopTimeline = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .goTo(loopTween, {
            scale: 1.1,
        });

    return {
        playIntro: () => introTl?.play(),
        playSvg: () => {
            loopTimeline?.play();
        },
        destroy: () => {
            introTween.destroy();
            // @ts-ignore
            introTween = null;
            introTl.destroy();
            // @ts-ignore
            introTl = null;
            loopTween.destroy();
            // @ts-ignore
            loopTween = null;
            loopTimeline.destroy();
            // @ts-ignore
            loopTimeline = null;
        },
    };
};
