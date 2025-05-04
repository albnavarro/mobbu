//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { MobMotionCore } from '@mobMotion';

const shouldActivateCta = () => {
    return /** @type {boolean} */ (MobMotionCore.mq('min', 'desktop'));
};

/** @type {MobComponent<import('./type').OnlyDesktop>} */
export const OnlyDesktopFnCta = ({ onMount, getProxi, bindEffect }) => {
    const proxi = getProxi();
    proxi.active = shouldActivateCta();

    onMount(() => {
        const unsubscribeResize = MobCore.useResize(() => {
            proxi.active = shouldActivateCta();
        });

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
