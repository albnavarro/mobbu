import { timeline, tween } from '../../../../../mobMotion';

export const childAnimations = ({ groups }) => {
    console.log(groups);

    /**
     * Intro tween.
     */
    let introTween = tween.createTween({
        data: { opacity: 0, scale: 1.2 },
        duration: 2000,
        ease: 'easeOutQuart',
        stagger: { each: 5, from: 'center' },
    });

    groups.forEach((item) => {
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
        playIntro: async () => {
            return introTl.play();
        },
        destroy: () => {
            introTween.destroy();
            introTween = null;
            introTl.destroy();
            introTl = null;
        },
    };
};
