import { timeline, tween } from '../../../mobMotion';
import { loadUrl, mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const PageTransition = ({ onMount, watch, html }) => {
    onMount(({ element }) => {
        let currentUrl = '';
        let isRunning = false;

        const clipPathpoint = [
            { xIn: 0, xOut: 0 },
            { xIn: 0, xOut: 0 },
        ];

        const applyTransformation = () => {
            const { xIn } = clipPathpoint[0];
            const { xIn: xIn2 } = clipPathpoint[1];
            const { xOut } = clipPathpoint[0];
            const { xOut: xOut2 } = clipPathpoint[1];
            element.style.display = 'block';
            element.style.clipPath = `polygon(${xOut}% 0%, ${xIn}% 0%, ${xIn2}% 100%, ${xOut2}% 100%)`;
            element.style.transform = `translateZ(0.5px)`;
        };

        /**
         * Create tween.
         */
        const transitionTween = tween.createTween({
            data: { xIn: 0, xOut: 0 },
            stagger: { waitComplete: true, each: 8 },
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
            autoSet: false,
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
            .addAsync(({ resolve }) => {
                const unWatch = mainStore.watch('atfterRouteChange', () => {
                    unWatch();
                    resolve();
                });

                loadUrl({ url: currentUrl });
            })
            .goTo(
                transitionTween,
                { xOut: 100 },
                { ease: 'easeInCubic', duration: 500 }
            );

        /**
         * Watch rounte change (callback).
         */
        watch('url', async (url) => {
            if (isRunning) return;

            isRunning = true;
            currentUrl = url;
            await transitionTimeline.play();
            isRunning = false;

            /**
             * Reset mask.
             */
            element.style.clipPath = 'none';
            element.style.transform = 'none';
            element.style.display = 'none';
        });

        /**
         * Persistent component
         * Nothig to destroy
         */
        return () => {};
    });

    return html`<div class="c-page-transiotion"></div>`;
};
