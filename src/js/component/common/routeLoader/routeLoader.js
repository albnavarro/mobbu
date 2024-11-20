//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { RouteLoader } from './type';
 **/

import { afterRouteChange, beforeRouteChange } from '../../../mobjs';
import { tween } from '../../../mobMotion';

/** @type {MobComponent<RouteLoader>} */
export const RouteLoaderFn = ({ html, onMount }) => {
    onMount(({ element }) => {
        element.classList.add('disable');

        let tweenOut = tween.createTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        tweenOut.subscribe(({ opacity, scale }) => {
            element.style.opacity = opacity;
            element.style.transform = `scale(${scale})`;
        });

        beforeRouteChange(() => {
            element.classList.remove('disable');
            tweenOut.goTo({ opacity: 1, scale: 1 });
        });

        afterRouteChange(async () => {
            await tweenOut.goTo({ opacity: 0, scale: 0.9 });
            element.classList.add('disable');
        });

        return () => {
            tweenOut.destroy();
            // @ts-ignore
            tweenOut = null;
        };
    });

    return html`
        <div class="c-loader center-viewport">
            <span class="c-loader__inner"></span>
        </div>
    `;
};
