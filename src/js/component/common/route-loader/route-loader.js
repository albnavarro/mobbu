/**
 * @import {MobComponent} from '@mobJsType';
 * @import {RouteLoader} from './type';
 */

import { html, MobJs } from '@mobJs';
import { MobTween } from '@mobMotion';

/** @type {MobComponent<RouteLoader>} */
export const RouteLoaderFn = ({ onMount, getProxi, bindEffect, addMethod }) => {
    const proxi = getProxi();

    addMethod('skip', () => {
        proxi.skip = false;
    });

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

        const unsubscribeBeforeRouteChange = MobJs.beforeRouteChange(
            async () => {
                if (proxi.skip) return;
                proxi.isDisable = false;

                await tweenOut.set({ opacity: 1 });
                tweenOut.goTo({ scale: 1 });
            }
        );

        const unsubScribeAfterRouteChange = MobJs.afterRouteChange(async () => {
            await tweenOut.goTo({ opacity: 0, scale: 0.9 }).catch(() => {});

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
