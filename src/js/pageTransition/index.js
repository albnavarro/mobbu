import { mainStore, MAIN_STORE_BEFORE_ROUTE_CHANGE } from '../mobjs';
import { motionCore, timeline, tween } from '../mobMotion';

let scrollY = 0;

mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
    scrollY = window.scrollY;
});

/**
 * @type {import('../mobjs/type').beforePageTransition}
 */
export const beforePageTransition = async ({ oldNode }) => {
    oldNode.classList.add('fake-content');
    oldNode.style.position = 'fixed';
    oldNode.style.zIndex = 10;
    oldNode.style.top = 'var(--header-height)';
    oldNode.style.left = '0';
    oldNode.style.width = '100vw';
    oldNode.style.transform = `translate(calc(var(--header-height) / 2), -${scrollY}px)`;
    oldNode.style.minHeight =
        'calc(100vh - var(--header-height) - var(--footer-height))';
};

/**
 * @type {import('../mobjs/type').pageTransition}
 */
export const pageTransition = async ({
    oldNode,
    newNode,
    oldRoute,
    newRoute,
}) => {
    if (motionCore.mq('max', 'desktop') || oldRoute === newRoute) return;

    newNode.style.opacity = 0;

    const oldNodeTween = tween.createTween({
        data: { opacity: 1 },
        duration: 300,
    });

    const newNodeTween = tween.createTween({
        data: { opacity: 0 },
        duration: 500,
    });

    oldNodeTween.subscribe(({ opacity }) => {
        oldNode.style.opacity = opacity;
    });

    newNodeTween.subscribe(({ opacity }) => {
        newNode.style.opacity = opacity;
    });

    let tl = timeline
        .createAsyncTimeline({ repeat: 1 })
        .createGroup({ waitComplete: true })
        .goTo(oldNodeTween, { opacity: 0 })
        .goTo(newNodeTween, { opacity: 1 })
        .closeGroup();

    await tl.play();

    tl.destroy();
    tl = null;

    newNode.style.removeProperty('opacity');
};
