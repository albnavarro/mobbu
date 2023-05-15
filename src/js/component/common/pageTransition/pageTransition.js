import { timeline, tween } from '../../../mobbu';
import { loadUrl } from '../../../mobjs';

export const PageTransition = ({ render, onMount, watch }) => {
    onMount(({ element }) => {
        let currentUrl = '';

        /**
         * Create tween.
         */
        const transitionTween = tween.createTween({
            data: { x: -100, y: 0 },
        });

        /**
         * Subscribe
         */
        transitionTween.subscribe(({ x, y }) => {
            element.style.transform = `translate(${x}%, ${y}%)`;
        });

        /**
         * Create timline
         */
        const transitionTimeline = timeline.createAsyncTimeline({
            repeat: 1,
            autoSet: true,
        });

        /**
         * Add tween to timeline.
         */
        transitionTimeline
            .goTo(
                transitionTween,
                { x: 0 },
                { ease: 'easeInOutCirc', duration: 500 }
            )
            .add(() => loadUrl({ url: currentUrl }))
            .goTo(
                transitionTween,
                { y: -100 },
                { ease: 'easeInCubic', duration: 1500 }
            );

        /**
         * Watch rounte change (callback).
         */
        watch('url', (url) => {
            currentUrl = url;
            transitionTimeline.play();
        });

        /**
         * Persisten component
         * Nothig to destroy
         */
        return () => {};
    });

    return render(/* HTML */ `<div class="c-page-transiotion"></div>`);
};
