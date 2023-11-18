import { timeline, tween } from '../../../../mobMotion';

export const homeAnimation = ({ logoRefs }) => {
    const logoTween = tween.createTween({
        data: { scale: 1 },
        duration: 3000,
        ease: 'easeInOutQuad',
        stagger: { each: 40 },
    });

    logoRefs.forEach((group) => {
        logoTween.subscribe(({ scale }) => {
            group.style.transform = `translateZ(0) scale(${scale})`;
        });
    });

    const tl = timeline.createAsyncTimeline({ repeat: -1, yoyo: true });

    tl.goTo(logoTween, { scale: 0.95 }).goTo(logoTween, { scale: 1.05 });

    return {
        play: () => tl.play(),
        destroy: () => {},
    };
};
