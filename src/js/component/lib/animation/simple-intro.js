//@ts-check

import { MobTimeline, MobTween } from '@mobMotion';
import { navigationStore } from '@stores/navigation';

/** @type {import('./type').SimpleIntroAnimation} */
export const simpleIntroAnimation = ({ refs }) => {
    let introTween = MobTween.createTimeTween({
        data: { scale: 0 },
        duration: 3000,
        ease: 'easeOutBack',
        stagger: { each: 8, from: 'end' },
    });

    let loopTween = MobTween.createTimeTween({
        data: { scale: 1 },
        duration: 6000,
        ease: 'easeInOutQuad',
        stagger: { each: 12, from: 'end' },
    });

    refs.forEach((item) => {
        introTween.subscribeCache(item, ({ scale }) => {
            item.style.scale = `${scale}`;
        });

        loopTween.subscribeCache(item, ({ scale }) => {
            item.style.scale = `${scale}`;
        });
    });

    let introTl = MobTimeline.createAsyncTimeline({
        repeat: 1,
        autoSet: false,
    }).goTo(introTween, {
        scale: 1,
    });

    let loopTimeline = MobTimeline.createAsyncTimeline({
        repeat: -1,
        yoyo: true,
        autoSet: false,
    }).goTo(loopTween, {
        scale: 1.1,
    });

    const unsubscribeNavigationStore = navigationStore.watch(
        'navigationIsOpen',
        (isOpen) => {
            if (isOpen) {
                if (introTl.isActive()) introTl.pause();
                if (loopTimeline.isActive()) loopTimeline.pause();
                return;
            }

            if (introTl.isActive()) introTl.resume();
            if (loopTimeline.isActive()) loopTimeline.resume();
        }
    );

    return {
        playIntro: () => introTl?.play(),
        playSvg: () => {
            loopTimeline?.play();
        },
        destroy: () => {
            unsubscribeNavigationStore();
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
