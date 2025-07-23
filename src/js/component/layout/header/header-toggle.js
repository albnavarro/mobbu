/**
 * @import {MobComponent} from '@mobJsType';
 */

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { html } from '@mobJs';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({
    delegateEvents,
    bindEffect,
    bindStore,
    getProxi,
}) => {
    bindStore([navigationStore]);
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
