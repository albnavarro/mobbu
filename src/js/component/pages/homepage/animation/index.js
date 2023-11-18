import { timeline, tween } from '../../../../mobMotion';

export const homeAnimation = ({ logoRefs }) => {
    const logoRefsByKey = logoRefs.map((item) => {
        const [key, value] = Object.entries(item)[0];
        return { key, item: value };
    });

    const logoTween = tween.createTween({
        data: { scale: 1, x: 0 },
        duration: 3000,
        ease: 'easeInOutQuad',
        stagger: { each: 40, from: 'end' },
    });

    logoRefsByKey.forEach(({ key, item }) => {
        logoTween.subscribe(({ scale, x }) => {
            item.style.scale = `${scale}`;

            if (key !== 'M_right' && key !== 'M_left') return;
            const xVal = key === 'M_right' ? -x : x;
            item.style.translate = `${xVal}px 0px`;
        });
    });

    const tl = timeline.createAsyncTimeline({ repeat: -1, yoyo: true });

    tl.goTo(logoTween, { scale: 0.95, x: 0.5 }).goTo(logoTween, {
        scale: 1.05,
        x: -0.5,
    });

    return {
        play: () => tl.play(),
        destroy: () => {
            logoTween.destroy();
            tl.destroy();
        },
    };
};
