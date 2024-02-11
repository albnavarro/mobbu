import { timeline, tween } from '../mobMotion';

/**
 * @type {import('../mobjs/type').pageTransition}
 */
export const pageTransition = async ({
    oldNode,
    newNode,
    oldRoute,
    newRoute,
}) => {
    newNode.style.opacity = 0;

    /**
     * Transition example.
     */
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
