/**
 * @import {MobComponent} from '@mobJsType';
 */

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { html } from '@mobJs';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({ delegateEvents, bindEffect, getProxi }) => {
    const proxi = getProxi();

    navigationStore.watch('navigationIsOpen', (value) => {
        proxi.isOpen = value;
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
                },
            })}
            ${bindEffect({
                toggleClass: {
                    'is-open': () => proxi.isOpen,
                },
            })}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
};
