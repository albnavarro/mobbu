//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { RouteLoader } from './type';
 **/

import { afterRouteChange, beforeRouteChange } from '../../../mobjs';
import { MobTween } from '../../../mobMotion';

/** @type {MobComponent<RouteLoader>} */
export const RouteLoaderFn = ({ html, onMount, getProxi, bindEffect }) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        proxi.isDisable = true;

        let tweenOut = MobTween.createTimeTween({
            data: { opacity: 1, scale: 1 },
            duration: 500,
        });

        tweenOut.subscribe(({ opacity, scale }) => {
            element.style.opacity = opacity;
            element.style.transform = `scale(${scale})`;
        });

        beforeRouteChange(() => {
            tweenOut.goTo({ opacity: 1, scale: 1 });

            proxi.isDisable = false;
        });

        afterRouteChange(async () => {
            await tweenOut.goTo({ opacity: 0, scale: 0.9 });

            proxi.isDisable = true;
        });

        return () => {
            tweenOut.destroy();
            // @ts-ignore
            tweenOut = null;
        };
    });

    return html`
        <div
            class="c-loader center-viewport"
            ${bindEffect({
                bind: 'isDisable',
                toggleClass: { disable: () => proxi.isDisable },
            })}
        >
            <span class="c-loader__inner"></span>
        </div>
    `;
};
