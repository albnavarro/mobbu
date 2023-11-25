import { tween } from '../../../mobMotion';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Loader = ({ onMount, html, watch, remove }) => {
    onMount(({ element }) => {
        let tweenOut = tween.createTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        tweenOut.subscribe(({ opacity, scale }) => {
            element.style.opacity = opacity;
            element.style.transform = `scale(${scale})`;
        });

        watch('shouldRemove', async (shouldRemove) => {
            await tweenOut.goTo({ opacity: 0, scale: 0.9 });

            if (shouldRemove) remove();
        });

        return () => {
            tweenOut.destroy();
            tweenOut = null;
        };
    });

    return html`
        <div class="c-loader">
            <span class="c-loader__inner"> loader </span>
        </div>
    `;
};
