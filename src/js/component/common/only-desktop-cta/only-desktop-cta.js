/**
 * @import {MobComponent} from "@mobJsType"
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';

const shouldActivateCta = () => {
    return /** @type {boolean} */ (MobMotionCore.mq('min', 'desktop'));
};

/** @type {MobComponent<import('./type').OnlyDesktop>} */
export const OnlyDesktopFnCta = ({ onMount, getProxi, bindEffect, watch }) => {
    const proxi = getProxi();
    proxi.active = shouldActivateCta();

    onMount(() => {
        const unsubscribeResize = MobCore.useResize(() => {
            proxi.active = shouldActivateCta();
        });

        /**
         * Redirect to home page on resize over 1024px.
         *
         * - Fallback is cta ( this component itself )
         */
        watch(
            () => proxi.active,
            (value) => {
                if (!value) return;

                MobJs.loadUrl({ url: '#home' });
            }
        );

        return () => {
            unsubscribeResize();
        };
    });

    return html`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                },
            })}
        >
            home page
        </a>
    `;
};
