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

                    const isOpen = navigationStore.getProp('navigationIsOpen');
                    if (!isOpen) {
                        UnFreezeMobPageScroll();
                        console.log('unfreeze');
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
