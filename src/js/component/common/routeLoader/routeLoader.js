import { mainStore } from '../../../mobjs';
import { tween } from '../../../mobMotion';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const RouteLoader = ({ html, onMount }) => {
    onMount(({ element }) => {
        let tweenOut = tween.createTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        tweenOut.subscribe(({ opacity, scale }) => {
            element.style.opacity = opacity;
            element.style.transform = `scale(${scale})`;
        });

        mainStore.watch('beforeRouteChange', () => {
            tweenOut.goTo({ opacity: 1, scale: 1 });
        });

        mainStore.watch('atfterRouteChange', () => {
            tweenOut.goTo({ opacity: 0, scale: 0.9 });
        });

        return () => {
            tweenOut.destroy();
            tweenOut = null;
        };
    });

    return html`
        <div class="c-loader center-viewport">
            <span class="c-loader__inner"></span>
        </div>
    `;
};
