import { MobJs } from '@mobJs';
import { MobTimeline, MobMotionCore, MobTween } from '@mobMotion';

let scrollY = 0;

MobJs.beforeRouteChange(() => {
    scrollY = window.scrollY;
});

/**
 * @type {import('@mobJsType').BeforePageTransition}
 */
export const beforePageTransition = async ({ oldNode }) => {
    oldNode.classList.remove('current-route');
    oldNode.classList.add('fake-content');
    oldNode.style.position = 'fixed';
    oldNode.style.zIndex = '10';
    oldNode.style.top = 'var(--header-height)';
    oldNode.style.left = '0';
    oldNode.style.width = '100vw';
    oldNode.style.transform = `translate(calc(var(--header-height) / 2), -${scrollY}px)`;
    oldNode.style.minHeight =
        'calc(100vh - var(--header-height) - var(--footer-height))';
};

/**
 * @type {import('@mobJsType').PageTransition}
 */
export const pageTransition = async ({
    oldNode,
    newNode,
    oldRoute,
    newRoute,
}) => {
    if (MobMotionCore.mq('max', 'desktop') || oldRoute === newRoute) return;

    /** @type {HTMLElement} */ (newNode).style.opacity = '0';

    const oldNodeTween = MobTween.createTimeTween({
        data: { opacity: 1 },
        duration: 300,
    });

    const newNodeTween = MobTween.createTimeTween({
        data: { opacity: 0 },
        duration: 500,
    });

    oldNodeTween.subscribe(({ opacity }) => {
        /** @type {HTMLElement} */ (oldNode).style.opacity = opacity;
    });

    newNodeTween.subscribe(({ opacity }) => {
        /** @type {HTMLElement} */ (newNode).style.opacity = opacity;
    });

    let tl = MobTimeline.createAsyncTimeline({ repeat: 1 })
        .createGroup({ waitComplete: true })
        .goTo(oldNodeTween, { opacity: 0 })
        .goTo(newNodeTween, { opacity: 1 })
        .closeGroup();

    await tl.play();

    tl.destroy();
    // @ts-ignore
    tl = null;

    /** @type {HTMLElement} */ (newNode).style.removeProperty('opacity');
    /** @type {HTMLElement} */ (newNode).classList.add('current-route');
};
