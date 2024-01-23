import { timeline, tween } from '../../../../mobMotion';

export const m3Animation = ({ refs }) => {
    let introTween = tween.createTween({
        data: { opacity: 0, scale: 0.5 },
        duration: 2000,
        ease: 'easeOutQuart',
        stagger: { each: 8, from: 'end' },
    });

    refs.forEach((item) => {
        introTween.subscribe(({ scale, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = opacity;
        });
    });

    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).goTo(introTween, {
        opacity: 1,
        scale: 1,
    });

    return {
        playIntro: () => introTl.play(),
        destroy: () => {
            introTween.destroy();
            introTween = null;
            introTl.destroy();
            introTl = null;
        },
    };
};
