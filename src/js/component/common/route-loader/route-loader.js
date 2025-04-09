//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {RouteLoader} from './type';
 */

import { html, MobJs } from '@mobJs';
import { MobTween } from '@mobMotion';

/** @type {MobComponent<RouteLoader>} */
export const RouteLoaderFn = ({ onMount, getProxi, bindEffect }) => {
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

        const unsubscribeBeforeRouteChange = MobJs.beforeRouteChange(() => {
            tweenOut.goTo({ opacity: 1, scale: 1 });

            proxi.isDisable = false;
        });

        const unsubScribeAfterRouteChange = MobJs.afterRouteChange(async () => {
            await tweenOut.goTo({ opacity: 0, scale: 0.9 });

            proxi.isDisable = true;
        });

        return () => {
            tweenOut.destroy();
            // @ts-ignore
            tweenOut = null;
            unsubscribeBeforeRouteChange();
            unsubScribeAfterRouteChange();
        };
    });

    return html`
        <div
            class="c-loader center-viewport"
            ${bindEffect({
                toggleClass: { disable: () => proxi.isDisable },
            })}
        >
            <span class="c-loader__inner"></span>
        </div>
    `;
};
