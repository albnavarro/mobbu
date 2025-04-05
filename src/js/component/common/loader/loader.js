//@ts-check

import { html } from '../../../mob/mobjs';
import { MobTween } from '../../../mob/mobMotion';

/** @type {import("../../../mob/mobjs/type").MobComponent<import('./type').Loader>} */
export const LoaderFn = ({ onMount, watch, remove, getState }) => {
    const { position } = getState();

    onMount(({ element }) => {
        let tweenOut = MobTween.createTimeTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        tweenOut.subscribe(({ opacity, scale }) => {
            element.style.opacity = opacity;
            element.style.transform = `scale(${scale})`;
        });

        watch('shouldRemove', async (shouldRemove) => {
            if (!shouldRemove) return;

            await tweenOut.goTo({ opacity: 0, scale: 0.9 });
            remove();
        });

        return () => {
            tweenOut.destroy();
            // @ts-ignore
            tweenOut = null;
        };
    });

    return html`
        <div class="c-loader ${position}">
            <span class="c-loader__inner"></span>
        </div>
    `;
};
