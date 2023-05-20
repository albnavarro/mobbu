import { timeline, tween } from '../../../mobbu';
import { loadUrl } from '../../../mobjs';

export const PageTransition = ({ render, onMount, watch }) => {
    onMount(({ element }) => {
        let currentUrl = '';

        const clipPathpoint = [
            { xIn: 0, xOut: 0 },
            { xIn: 0, xOut: 0 },
        ];

        const applyTransformation = () => {
            const { xIn } = clipPathpoint[0];
            const { xIn: xIn2 } = clipPathpoint[1];
            const { xOut } = clipPathpoint[0];
            const { xOut: xOut2 } = clipPathpoint[1];
            element.style.clipPath = `polygon(${xOut}% 0%, ${xIn}% 0%, ${xIn2}% 100%, ${xOut2}% 100%)`;
        };

        /**
         * Create tween.
         */
        const transitionTween = tween.createTween({
            data: { xIn: 0, xOut: 0 },
            stagger: { each: 8 },
        });

        /**
         * Subscribe
         */
        clipPathpoint.forEach((point) => {
            transitionTween.subscribe(({ xIn, xOut }) => {
                point.xIn = xIn;
                point.xOut = xOut;
                applyTransformation();
            });
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
                { xIn: 100 },
                { ease: 'easeInOutCirc', duration: 500 }
            )
            .add(() => loadUrl({ url: currentUrl }))
            .goTo(
                transitionTween,
                { xOut: 100 },
                { ease: 'easeInCubic', duration: 500 }
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
