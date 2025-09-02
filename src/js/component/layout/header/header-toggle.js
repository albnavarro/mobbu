/**
 * @import {MobComponent} from '@mobJsType';
 */

import { html } from '@mobJs';
import { UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({ delegateEvents, bindEffect, getProxi }) => {
    const proxi = getProxi();

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
            ${bindEffect({
                toggleClass: {
                    'is-open': () => proxi.navigationIsOpen,
                },
            })}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
};
