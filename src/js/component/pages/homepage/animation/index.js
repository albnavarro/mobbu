import { timeline, tween } from '../../../../mobMotion';

export const homeAnimation = ({ logoRefs, around }) => {
    const logoRefsByKey = logoRefs.map((item) => {
        const [key, value] = Object.entries(item)[0];
        return { key, item: value };
    });

    /**
     * Intro tween.
     */
    let logoIntroTween = tween.createTween({
        data: { opacity: 0, scale: 2, x: -10 },
        duration: 2000,
        ease: 'easeInOutBack',
        stagger: { each: 8, from: 'end' },
    });

    /**
     * Intro default tween.
     */
    let logoTween = tween.createTween({
        data: { scale: 1, x: 0 },
        duration: 4000,
        ease: 'easeInOutQuad',
        stagger: { each: 40, from: 'end' },
    });

    /**
     * Side tween.
     */
    let aroundTween = tween.createTween({
        data: { scale: 1 },
        duration: 4000,
        ease: 'easeInOutQuad',
        stagger: { each: 20 },
    });

    /**
     * Subscribe intro tween.
     */
    logoRefsByKey.forEach(({ key, item }) => {
        logoTween.subscribe(({ scale, x }) => {
            item.style.scale = `${scale}`;

            if (key !== 'M_right' && key !== 'M_left') return;
            const xVal = key === 'M_right' ? -x : x;
            item.style.translate = `${xVal}px 0px`;
        });
    });

    /**
     * Subscribe default tween.
     */
    logoRefsByKey.forEach(({ key, item }) => {
        logoIntroTween.subscribe(({ scale, x, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = opacity;

            if (key !== 'M_right' && key !== 'M_left') return;
            const xVal = key === 'M_right' ? -x : x;
            item.style.translate = `${xVal}px 0px`;
        });
    });

    /**
     * Subscribe side tween.
     */
    around.forEach((item) => {
        aroundTween.subscribe(({ scale }) => {
            item.style.scale = `${scale}`;
        });
    });

    /**
     * Default timeline.
     */
    let introTl = timeline
        .createAsyncTimeline({ repeat: 1 })
        .goTo(logoIntroTween, {
            opacity: 1,
            scale: 1,
            x: 0,
        });

    /**
     * Default timeline.
     */
    let tl = timeline
        .createAsyncTimeline({ repeat: -1, yoyo: true })
        .createGroup({ waitComplete: false })
        .goTo(logoTween, {
            scale: 0.95,
            x: 0.5,
        })
        .goTo(aroundTween, {
            scale: 0.95,
        })
        .closeGroup()
        .createGroup({ waitComplete: false })
        .goTo(logoTween, {
            scale: 1.05,
            x: -0.5,
        })
        .goTo(aroundTween, {
            scale: 1.05,
        })
        .closeGroup();

    return {
        playIntro: async () => {
            return introTl.play();
        },
        playSvg: () => tl.play(),
        destroySvg: () => {
            logoTween.destroy();
            tl.destroy();
            introTl.destroy();
            logoTween = null;
            logoIntroTween = null;
            aroundTween = null;
            tl = null;
            introTl = null;
        },
    };
};
