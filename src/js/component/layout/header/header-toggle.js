/**
 * @import {MobComponent} from '@mobJsType';
 */

import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({
    delegateEvents,
    bindEffect,
    getProxi,
    onMount,
}) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return html`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${delegateEvents({
                click: () => {
                    navigationStore.update(
                        'navigationIsOpen',
                        (state) => !state
                    );

                    /**
                     * Secure check. Mouse loave on SmoothScroll trigger Unfrezze too.
                     */
                    if (!proxi.navigationIsOpen) {
                        UnFreezeMobPageScroll();
                    }
                },
            })}
            ${bindEffect([
                {
                    toggleClass: {
                        'is-open': () => proxi.navigationIsOpen,
                    },
                },
                {
                    toggleClass: {
                        'is-visible': () => proxi.isMounted,
                    },
                },
            ])}
        >
            <div
                class="hamburger__box"
                ${bindEffect([
                    {
                        toggleClass: {
                            'is-visible': () => proxi.isMounted,
                        },
                    },
                ])}
            >
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
};
