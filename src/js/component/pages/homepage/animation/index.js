import { timeline, tween } from '../../../../mobMotion';

export const homeAnimation = ({ logoRefs, around }) => {
    const logoRefsByKey = logoRefs.map((item) => {
        const [key, value] = Object.entries(item)[0];
        return { key, item: value };
    });

    let logoTween = tween.createTween({
        data: { scale: 1, x: 0 },
        duration: 4000,
        ease: 'easeInOutQuad',
        stagger: { each: 40, from: 'end' },
    });

    let aroundTween = tween.createTween({
        data: { scale: 1 },
        duration: 4000,
        ease: 'easeInOutQuad',
        stagger: { each: 20 },
    });

    logoRefsByKey.forEach(({ key, item }) => {
        logoTween.subscribe(({ scale, x }) => {
            item.style.scale = `${scale}`;

            if (key !== 'M_right' && key !== 'M_left') return;
            const xVal = key === 'M_right' ? -x : x;
            item.style.translate = `${xVal}px 0px`;
        });
    });

    around.forEach((item) => {
        aroundTween.subscribe(({ scale }) => {
            item.style.scale = `${scale}`;
        });
    });

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
        play: () => tl.play(),
        destroy: () => {
            logoTween.destroy();
            tl.destroy();
            logoTween = null;
            aroundTween = null;
            tl = null;
        },
    };
};
